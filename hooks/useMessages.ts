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
  getDocs
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

export function useClientMessages(customerEmail: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!customerEmail) {
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'messages'),
      where('customerEmail', '==', customerEmail),
      orderBy('timestamp', 'desc')
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
    })

    return () => unsubscribe()
  }, [customerEmail])

  const sendMessage = useCallback(async (content: string, subject?: string) => {
    if (!customerEmail) return

    await addDoc(collection(db, 'messages'), {
      customerEmail,
      customerName: customerEmail.split('@')[0],
      from: 'client',
      content,
      subject: subject || 'General Inquiry',
      timestamp: serverTimestamp(),
      read: false
    })
  }, [customerEmail])

  const markAsRead = useCallback(async (messageId: string) => {
    await updateDoc(doc(db, 'messages', messageId), { read: true })
  }, [])

  return { messages, unreadCount, loading, sendMessage, markAsRead }
}

export function useAllConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'conversations'),
      orderBy('lastUpdated', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs: Conversation[] = []
      snapshot.forEach((doc) => {
        convs.push({ id: doc.id, ...doc.data() } as Conversation)
      })
      setConversations(convs)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const replyToConversation = useCallback(async (conversationId: string, content: string, customerEmail: string) => {
    // Add message
    await addDoc(collection(db, 'messages'), {
      conversationId,
      customerEmail,
      from: 'admin',
      content,
      timestamp: serverTimestamp(),
      read: false
    })

    // Update conversation
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: content,
      lastUpdated: serverTimestamp(),
      unreadByClient: (await getDocs(query(collection(db, 'conversations'), where('id', '==', conversationId)))).docs[0]?.data()?.unreadByClient + 1 || 1
    })
  }, [])

  const markConversationAsReadByAdmin = useCallback(async (conversationId: string) => {
    await updateDoc(doc(db, 'conversations', conversationId), {
      unreadByAdmin: 0
    })
  }, [])

  return { conversations, loading, replyToConversation, markConversationAsReadByAdmin }
}
