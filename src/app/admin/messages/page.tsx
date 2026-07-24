'use client';

import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TrashSimple, Envelope, EnvelopeOpen, Calendar, User } from '@phosphor-icons/react';
import { formatDate } from '@/lib/utils';

export default function AdminMessages() {
  const { messages, markMessageRead, deleteMessage } = useCMS();
  const [selectedMsg, setSelectedMsg] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteMessage(deleteId);
      setDeleteId(null);
    }
  };

  const msg = selectedMsg ? messages.find((m) => m.id === selectedMsg) : null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-white/40">Incoming inquiries</p>
        <h2 className="text-2xl font-bold text-white mt-1">Messages</h2>
      </div>

      <div className="doppelrand-outer">
        <div className="doppelrand-inner overflow-hidden">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <Envelope size={24} className="mx-auto text-white/10 mb-3" />
              <p className="text-white/30 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-5 cursor-pointer transition-colors hover:bg-white/[0.02] ${
                    !message.read ? 'bg-purple-500/[0.02]' : ''
                  }`}
                  onClick={() => {
                    setSelectedMsg(message.id);
                    if (!message.read) markMessageRead(message.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!message.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        )}
                        <p className={`text-sm font-medium truncate ${!message.read ? 'text-white' : 'text-white/60'}`}>
                          {message.name}
                        </p>
                        <Badge variant="accent" size="sm">{message.subject}</Badge>
                      </div>
                      <p className="text-sm text-white/40 truncate mt-0.5">{message.message}</p>
                      <p className="text-xs text-white/20 mt-1.5 flex items-center gap-1.5">
                        <Calendar size={10} />
                        {formatDate(message.date)}
                        <span className="mx-1">·</span>
                        <User size={10} />
                        {message.email}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(message.id);
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                    >
                      <TrashSimple size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      <Modal isOpen={!!msg} onClose={() => setSelectedMsg(null)} title={msg?.subject}>
        {msg && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <span className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-medium">
                {msg.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{msg.name}</p>
                <p className="text-xs text-white/40">{msg.email}</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            <p className="text-xs text-white/30 pt-2">{formatDate(msg.date)}</p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Message">
        <p className="text-sm text-white/60 mb-6">Are you sure you want to delete this message?</p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="md" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" size="md" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
