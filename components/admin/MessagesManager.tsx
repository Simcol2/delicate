'use client'

import { useState } from 'react'
import { useAllConversations, useConversationMessages } from '@/hooks/useMessages'
import { MessageCircle, Send } from 'lucide-react'

export default function MessagesManager() {
  const { conversations, loading: convsLoading, replyToConversation, markConversationAsReadByAdmin } = useAllConversations()
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [sending, setSending] = useState(false)

  const selectedConv = conversations.find(c => c.id === selectedConversationId)
  const { messages, loading: msgsLoading } = useConversationMessages(selectedConversationId)

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim() || !selectedConversationId || !selectedConv) return

    setSending(true)
    try {
      await replyToConversation(selectedConversationId, replyContent, selectedConv.customerEmail)
      setReplyContent('')
    } catch (error) {
      console.error('Failed to send reply:', error)
    } finally {
      setSending(false)
    }
  }

  const handleSelectConversation = (convId: string) => {
    setSelectedConversationId(convId)
    markConversationAsReadByAdmin(convId)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#1A2744] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5" />
          <h2 className="font-serif text-lg">Client Messages</h2>
        </div>
        {conversations.some(c => (c.unreadByAdmin || 0) > 0) && (
          <span className="bg-[#CC2A7A] text-white text-xs px-2 py-1 rounded-full">
            {conversations.reduce((sum, c) => sum + (c.unreadByAdmin || 0), 0)} unread
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-3 min-h-[500px]">
        {/* Conversations List */}
        <div className="border-r border-gray-200 overflow-y-auto max-h-[500px]">
          {convsLoading ? (
            <p className="p-4 text-sm text-gray-500">Loading conversations...</p>
          ) : conversations.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No messages yet</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedConversationId === conv.id ? 'bg-gray-50 border-l-4 border-l-[#CC2A7A]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1A2744]">{conv.customerEmail}</span>
                  {(conv.unreadByAdmin || 0) > 0 && (
                    <span className="bg-[#CC2A7A] text-white text-xs px-2 py-0.5 rounded-full">
                      {conv.unreadByAdmin}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{conv.subject}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">{conv.lastMessage}</p>
              </button>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="md:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium text-[#1A2744]">{selectedConv.customerEmail}</h3>
                <p className="text-xs text-gray-500">{selectedConv.subject}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
                {msgsLoading ? (
                  <p className="text-center text-gray-500 text-sm">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm">No messages in this conversation</p>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.from === 'admin' 
                          ? 'bg-[#CC2A7A] text-white ml-auto' 
                          : 'bg-gray-100 text-[#1A2744]'
                      }`}
                    >
                      <span className="text-xs opacity-70 block mb-1">
                        {msg.from === 'admin' ? 'You' : 'Client'} • {msg.timestamp?.toDate?.().toLocaleString() || 'Just now'}
                      </span>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendReply} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#CC2A7A]"
                  />
                  <button
                    type="submit"
                    disabled={sending || !replyContent.trim()}
                    className="bg-[#CC2A7A] text-white px-4 py-2 rounded text-sm hover:bg-[#1A2744] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-2" />
                <p>Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
