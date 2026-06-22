// The read-only Spaces panel (UI_AS_APPS_SPEC §5.2 — spaces management, the
// read-only/baseline `listSpaces` half; FILE_SHARING_SPEC §9.7 share surface).
// Lists the spaces the user has granted TO THIS APP — never their full space
// list. That app-scoping is enforced host-side; calling
// `listSpaces({ app: true })` requests exactly that scoped view.
import { useEffect, useMemo, useState } from 'react';
import { listSpaces, type SpaceInfo } from '@immediately-run/sdk/mounts';
import { LayoutGrid, Search, FolderClosed } from 'lucide-react';

type Status = 'loading' | 'ready' | 'empty' | 'error';

const ROLE_LABEL: Record<string, string> = {
  owner: 'owner',
  writer: 'writer',
  reader: 'reader',
};

function SpacesPanel() {
  const [status, setStatus] = useState<Status>('loading');
  const [spaces, setSpaces] = useState<SpaceInfo[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let live = true;
    listSpaces({ app: true })
      .then((list) => {
        if (!live) return;
        setSpaces(list);
        setStatus(list.length ? 'ready' : 'empty');
      })
      .catch(() => {
        if (live) setStatus('error');
      });
    return () => {
      live = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spaces;
    return spaces.filter((s) => (s.name ?? s.spaceId).toLowerCase().includes(q));
  }, [spaces, query]);

  return (
    <section className="panel" aria-label="Spaces">
      <header className="panel__head">
        <span className="panel__glyph">
          <LayoutGrid size={15} aria-hidden="true" />
        </span>
        <span className="panel__title">Spaces</span>
      </header>

      <div className="panel__search">
        <span className="field">
          <Search size={15} aria-hidden="true" />
          <input
            placeholder="Search spaces…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search spaces"
          />
        </span>
      </div>

      <div className="panel__body">
        {status === 'loading' && (
          <ul className="rows" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <li className="row row--skeleton" key={i}>
                <span className="sk sk--icon" />
                <span className="rmain">
                  <span className="sk" style={{ width: '55%' }} />
                  <span className="sk sk--sub" style={{ width: '35%' }} />
                </span>
              </li>
            ))}
          </ul>
        )}

        {status === 'error' && (
          <div className="state">
            <h4>Couldn&apos;t load your spaces.</h4>
            <p>Something went wrong reaching the platform. Try reopening the panel.</p>
          </div>
        )}

        {status === 'empty' && (
          <div className="state">
            <span className="state__icon">
              <FolderClosed size={20} aria-hidden="true" />
            </span>
            <h4>No spaces yet.</h4>
            <p>
              This app has access to no spaces. When you grant it one, it shows
              up here.
            </p>
          </div>
        )}

        {status === 'ready' && (
          <>
            <ul className="rows">
              {filtered.map((s) => (
                <li key={s.spaceId}>
                  <button type="button" className="row">
                    <span className="ri">
                      <FolderClosed size={16} aria-hidden="true" />
                    </span>
                    <span className="rmain">
                      <span className="rname">{s.name ?? s.spaceId}</span>
                      {s.role && (
                        <span className="rmeta">{ROLE_LABEL[s.role] ?? s.role}</span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && (
              <div className="state state--quiet">
                <p>No spaces match “{query}”.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default SpacesPanel;
