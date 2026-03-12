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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
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
  }

  const handleMarkRead = (messageId: string) => {
    markAsRead(messageId)
  }

  return (
    <div className="bg-white p-8">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#CC2A7A] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-serif text-xl text-[#1A2744]">Messages</h2>
            <p className="text-xs text-[#1A2744]/50">Communicate with your event coordinator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="bg-[#CC2A7A] text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5 text-[#1A2744]" /> : <ChevronDown className="w-5 h-5 text-[#1A2744]" />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-[#1A2744]/70 text-center py-4">Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-[#C9A96E]/30">
              <MessageCircle className="w-8 h-8 text-[#1A2744]/30 mx-auto mb-2" />
              <p className="text-sm text-[#1A2744]/70">No messages yet</p>
              <p className="text-xs text-[#1A2744]/50 mt-1">
                Start a conversation with your event coordinator
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
              {[...messages].reverse().map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-4 rounded-lg ${
                    msg.from === 'client' 
                      ? 'bg-[#FAF6F0] ml-8' 
                      : 'bg-[#1A2744]/5 mr-8'
                  } ${!msg.read && msg.from === 'admin' ? 'border-l-4 border-[#CC2A7A]' : ''}`}
                  onClick={() => !msg.read && msg.from === 'admin' && handleMarkRead(msg.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#1A2744]/70">
                      {msg.from === 'client' ? 'You' : 'Delicate Flowers'}
                    </span>
                    <span className="text-xs text-[#1A2744]/50">
                      {msg.timestamp?.toDate?.().toLocaleString() || 'Just now'}
                    </span>
                  </div>
                  {!msg.read && msg.from === 'admin' && (
                    <span className="text-xs text-[#CC2A7A] font-medium">NEW</span>
                  )}
                  <p className="text-sm text-[#1A2744] mt-1">{msg.content}</p>
                </div>
              ))}
            </div>
          )}

          {showNewMessageForm ? (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase font-sans mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2 text-[#1A2744] focus:border-[#CC2A7A] focus:outline-none transition-colors text-sm"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase font-sans mb-2">
                  Message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2 text-[#1A2744] focus:border-[#CC2A7A] focus:outline-none transition-colors text-sm resize-none"
                  rows={3}
                  placeholder="Type your message..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#CC2A7A] text-white px-4 py-2 text-sm hover:bg-[#1A2744] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewMessageForm(false)}
                  className="text-[#1A2744]/70 text-sm hover:text-[#CC2A7A]"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNewMessageForm(true)}
              className="w-full py-3 border-2 border-[#CC2A7A] text-[#CC2A7A] font-sans text-sm tracking-widest uppercase hover:bg-[#CC2A7A] hover:text-white transition-all"
            >
              Send New Message
            </button>
          )}
        </div>
      )}
    </div>
  )
}
