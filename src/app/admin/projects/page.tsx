'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, PencilSimple, TrashSimple, Calendar, ArrowUpRight } from '@phosphor-icons/react';
import { formatDate } from '@/lib/utils';

export default function AdminProjects() {
  const { projects, deleteProject } = useCMS();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/40">Manage your work</p>
          <h2 className="text-2xl font-bold text-white mt-1">Projects</h2>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary" size="md">
            <Plus size={14} weight="bold" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="doppelrand-outer">
        <div className="doppelrand-inner overflow-hidden">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/30 text-sm">No projects yet. Create your first one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="text-left text-xs font-medium text-white/30 uppercase tracking-wider px-5 py-3">Project</th>
                    <th className="text-left text-xs font-medium text-white/30 uppercase tracking-wider px-5 py-3">Category</th>
                    <th className="text-left text-xs font-medium text-white/30 uppercase tracking-wider px-5 py-3">Date</th>
                    <th className="text-left text-xs font-medium text-white/30 uppercase tracking-wider px-5 py-3">Status</th>
                    <th className="text-right text-xs font-medium text-white/30 uppercase tracking-wider px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{project.title}</p>
                          <p className="text-xs text-white/30 mt-0.5 line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant="accent" size="sm">{project.category}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-white/40 flex items-center gap-1.5">
                          <Calendar size={10} />
                          {formatDate(project.date)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {project.featured ? (
                          <Badge variant="green" size="sm">Featured</Badge>
                        ) : (
                          <Badge variant="default" size="sm">Standard</Badge>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/projects/${project.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" icon>
                              <ArrowUpRight size={12} />
                            </Button>
                          </Link>
                          <Link href={`/admin/projects/${project.id}`}>
                            <Button variant="ghost" size="sm" icon>
                              <PencilSimple size={12} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" icon onClick={() => setDeleteId(project.id)}>
                            <TrashSimple size={12} className="text-red-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Project">
        <p className="text-sm text-white/60 mb-6">
          Are you sure you want to delete this project? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="md" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={handleDelete}>
            Delete Project
          </Button>
        </div>
      </Modal>
    </div>
  );
}
