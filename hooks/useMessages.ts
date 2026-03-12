'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  limit
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Message {
  id: string
  conversationId: string
  customerEmail: string
  customerName: string
  from: 'client' | 'admin'
  content: string
  timestamp: any
  read: boolean
  subject?: string
}

export interface Conversation {
  id: string
  customerEmail: string
  customerName: string
  subject: string
  lastMessage: string
  lastUpdated: any
  unreadByClient: number
  unreadByAdmin: number
}

// Generate a consistent conversation ID from email
function getConversationId(email: string): string {
  return email.toLowerCase().replace(/[^a-z0-9]/g, '_')
}

export function useClientMessages(customerEmail: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!customerEmail) {
      setLoading(false)
      return
    }

    const conversationId = getConversationId(customerEmail)

    // Query messages by conversationId for better performance
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = []
      let unread = 0
      snapshot.forEach((doc) => {
        const data = doc.data()
        msgs.push({ id: doc.id, ...data } as Message)
        if (data.from === 'admin' && !data.read) {
          unread++
        }
      })
      setMessages(msgs)
      setUnreadCount(unread)
      setLoading(false)
    }, (error) => {
      console.error('Messages query error:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [customerEmail])

  const sendMessage = useCallback(async (content: string, subject?: string) => {
    if (!customerEmail) return

    const conversationId = getConversationId(customerEmail)
    const customerName = customerEmail.split('@')[0]

    try {
      // Add message
      await addDoc(collection(db, 'messages'), {
        conversationId,
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        from: 'client',
        content,
        subject: subject || 'General Inquiry',
        timestamp: serverTimestamp(),
        read: false
      })

      // Create or update conversation
      const conversationRef = doc(db, 'conversations', conversationId)
      await setDoc(conversationRef, {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        subject: subject || 'General Inquiry',
        lastMessage: content,
        lastUpdated: serverTimestamp(),
        unreadByClient: 0,
        unreadByAdmin: (await getDocs(query(collection(db, 'conversations'), where('id', '==', conversationId)))).docs[0]?.data()?.unreadByAdmin + 1 || 1
      }, { merge: true })

    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }, [customerEmail])

  const markAsRead = useCallback(async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), { read: true })
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }, [])

  return { messages, unreadCount, loading, sendMessage, markAsRead }
}

export function useAllConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'conversations'),
      orderBy('lastUpdated', 'desc'),
      limit(100)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs: Conversation[] = []
      snapshot.forEach((doc) => {
        convs.push({ id: doc.id, ...doc.data() } as Conversation)
      })
      setConversations(convs)
      setLoading(false)
    }, (error) => {
      console.error('Conversations query error:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const replyToConversation = useCallback(async (conversationId: string, content: string, customerEmail: string) => {
    try {
      // Add message
      await addDoc(collection(db, 'messages'), {
        conversationId,
        customerEmail: customerEmail.toLowerCase(),
        from: 'admin',
        content,
        timestamp: serverTimestamp(),
        read: false
      })

      // Update conversation
      const conversationRef = doc(db, 'conversations', conversationId)
      const convSnap = await getDocs(query(collection(db, 'conversations'), where('__name__', '==', conversationId)))
      const currentUnread = convSnap.docs[0]?.data()?.unreadByClient || 0

      await setDoc(conversationRef, {
        lastMessage: content,
        lastUpdated: serverTimestamp(),
        unreadByClient: currentUnread + 1
      }, { merge: true })

    } catch (error) {
      console.error('Error replying:', error)
      throw error
    }
  }, [])

  const markConversationAsReadByAdmin = useCallback(async (conversationId: string) => {
    try {
      const conversationRef = doc(db, 'conversations', conversationId)
      await setDoc(conversationRef, { unreadByAdmin: 0 }, { merge: true })
    } catch (error) {
      console.error('Error marking conversation read:', error)
    }
  }, [])

  return { conversations, loading, replyToConversation, markConversationAsReadByAdmin }
}

// Hook to get messages for a specific conversation (for admin)
export function useConversationMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!conversationId) {
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = []
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message)
      })
      setMessages(msgs)
      setLoading(false)
    }, (error) => {
      console.error('Conversation messages error:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [conversationId])

  return { messages, loading }
}
