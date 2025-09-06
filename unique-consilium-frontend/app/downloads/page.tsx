import fs from 'node:fs';
import path from 'node:path';
import SectionTitle from '@/components/SectionTitle';
import {
  Button,
  InlineNotification,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
} from '@carbon/react';
import { Download } from '@carbon/icons-react';

export const metadata = {
  title: 'Downloads | UNIQUE CONSILIUM',
};

// Incremental static regeneration: refresh list hourly
export const revalidate = 3600;

type DocItem = {
  name: string;
  href: string;
  size: string;
  updatedAt: string;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);
  // Requirement: show 1 decimal for KB/MB (and larger), integer for bytes
  const formatted = i === 0 ? Math.round(value).toString() : value.toFixed(1);
  return `${formatted} ${units[i]}`;
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function humanizeFileName(file: string): string {
  const base = file.replace(/\.pdf$/i, '');
  return base
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getDocuments(): DocItem[] {
  const docsDir = path.join(process.cwd(), 'public', 'docs');
  try {
    const entries = fs.readdirSync(docsDir, { withFileTypes: true });
    const pdfs = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.pdf'))
      .map((e) => {
        const full = path.join(docsDir, e.name);
        let size = 0;
        let mtime = new Date();
        try {
          const stat = fs.statSync(full);
          size = stat.size;
          mtime = stat.mtime;
        } catch {
          // ignore per-file failures
        }
        return {
          name: humanizeFileName(e.name),
          href: `/docs/${e.name}`,
          size: formatBytes(size),
          updatedAt: formatDate(mtime),
        } satisfies DocItem;
      });
    // sort by name ascending for stability
    pdfs.sort((a, b) => a.name.localeCompare(b.name));
    return pdfs;
  } catch {
    // Fallback for serverless environments without FS (static list)
    return [
      {
        name: 'Capabilities',
        href: '/docs/capabilities.pdf',
        size: '—', // unknown at build time
        updatedAt: '—',
      },
    ];
  }
}

export default function DownloadsPage() {
  const docs = getDocuments();
  return (
    <div className="downloads cds--grid">
      <div className="cds--row">
        <div className="cds--col-lg-12">
          <SectionTitle
            eyebrow="Downloads"
            title="Documents"
            subtitle="Brochures & policies"
            size="lg"
            align="start"
            autoAnchor
          />
        </div>
        <div className="cds--col-lg-12">
          {docs.length === 0 ? (
            <InlineNotification
              kind="info"
              lowContrast
              title="No documents available."
              hideCloseButton
            />
          ) : (
            <div className="downloads__table-wrapper">
              <DataTable
                rows={docs.map((d) => ({ id: d.href, name: d.name, size: d.size, updated: d.updatedAt, href: d.href }))}
                headers={[
                  { key: 'name', header: 'Name' },
                  { key: 'size', header: 'Size' },
                  { key: 'updated', header: 'Updated' },
                  { key: 'action', header: 'Action' },
                ]}
                isSortable={false}
              >
                {({ rows, headers, getHeaderProps, getTableProps }) => (
                  <TableContainer>
                    <Table {...getTableProps()} className="downloads__table" aria-label="Documents table">
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => {
                            const { key, ...rest } = getHeaderProps({ header });
                            return (
                              <TableHeader key={key} {...rest}>
                                {header.header}
                              </TableHeader>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.cells.map((cell) => {
                              if (cell.info.header === 'action') {
                                const d = docs.find((x) => x.href === (row as any).id)!;
                                return (
                                  <TableCell key={cell.id}>
                                    <Button
                                      as="a"
                                      kind="ghost"
                                      size="sm"
                                      renderIcon={Download}
                                      href={d.href}
                                      download
                                      aria-label={`Download ${d.name}`}
                                    >
                                      Download
                                    </Button>
                                  </TableCell>
                                );
                              }
                              return <TableCell key={cell.id}>{cell.value}</TableCell>;
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
