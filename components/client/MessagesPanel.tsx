'use client'

import { useState } from 'react'
import { useClientMessages } from '@/hooks/useMessages'
import { Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface MessagesPanelProps {
  customerEmail: string
}

export default function MessagesPanel({ customerEmail }: MessagesPanelProps) {
  const { messages, unreadCount, loading, sendMessage, markAsRead } = useClientMessages(customerEmail)
  const [newMessage, setNewMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showNewMessageForm, setShowNewMessageForm] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    setSending(true)
    try {
      await sendMessage(newMessage, subject || 'General Inquiry')
      
      // Send email notification to admin
      try {
        await fetch('/api/notifications/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'april@delicateflowers.co',
            toName: 'April',
            subject: `New Client Message: ${subject || 'General Inquiry'}`,
            message: `New message from ${customerEmail}:\n\n${newMessage}\n\nReply in the admin portal.`
          })
        })
      } catch (err) {
        console.error('Failed to send notification:', err)
      }
      
      setNewMessage('')
      setSubject('')
      setShowNewMessageForm(false)
    } catch (error) {
      console.error('Failed to send message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleMarkRead = (messageId: string) => {
    markAsRead(messageId)
  }

  return (
    <div className="bg-ivory p-8">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-cream" />
          </div>
          <div>
            <h2 className="font-serif text-xl text-dark">Messages</h2>
            <p className="text-xs text-text-light">Communicate with your event coordinator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="bg-rose text-cream text-xs px-2 py-1">
              {unreadCount} new
            </span>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5 text-dark" /> : <ChevronDown className="w-5 h-5 text-dark" />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-text-mid text-center py-4">Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gold/30">
              <MessageCircle className="w-8 h-8 text-text-light mx-auto mb-2" />
              <p className="text-sm text-text-mid">No messages yet</p>
              <p className="text-xs text-text-light mt-1">
                Start a conversation with your event coordinator
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto mb-6 border border-gold/20 p-4 bg-cream">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-4 ${
                    msg.from === 'client' 
                      ? 'bg-ivory ml-8 border-l-4 border-gold' 
                      : 'bg-cream mr-8 border-l-4 border-rose'
                  }`}
                  onClick={() => !msg.read && msg.from === 'admin' && handleMarkRead(msg.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-text-mid">
                      {msg.from === 'client' ? 'You' : 'Delicate Flowers'}
                    </span>
                    <span className="text-xs text-text-light">
                      {msg.timestamp?.toDate?.().toLocaleString() || 'Just now'}
                    </span>
                  </div>
                  {!msg.read && msg.from === 'admin' && (
                    <span className="text-xs text-rose font-medium mb-1 block">NEW</span>
                  )}
                  <p className="text-sm text-dark">{msg.content}</p>
                </div>
              ))}
            </div>
          )}

          {showNewMessageForm ? (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-dark text-xs tracking-widest uppercase font-sans mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-b border-gold py-2 text-dark focus:border-rose focus:outline-none transition-colors text-sm"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-dark text-xs tracking-widest uppercase font-sans mb-2">
                  Message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-gold py-2 text-dark focus:border-rose focus:outline-none transition-colors text-sm resize-none"
                  rows={3}
                  placeholder="Type your message..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 bg-rose text-cream px-4 py-2 text-sm hover:bg-dark transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewMessageForm(false)}
                  className="text-text-mid text-sm hover:text-rose"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNewMessageForm(true)}
              className="w-full py-3 border-2 border-rose text-rose font-sans text-sm tracking-widest uppercase hover:bg-rose hover:text-cream transition-all"
            >
              Send New Message
            </button>
          )}
        </div>
      )}
    </div>
  )
}
