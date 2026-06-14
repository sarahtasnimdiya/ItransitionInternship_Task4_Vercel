import { useRef, useEffect } from 'react';

function getUniqIdValue(prefix, id) {
  return `${prefix}-${id}`;
}

function timeAgo(date) {
  if (!date) return null;
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  if (seconds < 60)    return 'less than a minute ago';
  if (seconds < 3600)  return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}

function formatTime(date) {
  if (!date) return '';
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function StatusText({ status }) {
  const colors = { active: '#198754', blocked: '#dc3545', unverified: '#6c757d' };
  return (
    <span style={{ color: colors[status] ?? '#333', fontWeight: 500 }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function UserTable({ users, selectedIds, onSelectChange, loading }) {
  const allSelected  = users.length > 0 && selectedIds.length === users.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < users.length;

  
  const selectAllRef = useRef(null);
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  function toggleAll() {
    onSelectChange(allSelected ? [] : users.map(u => u.id));
  }

  function toggleOne(id) {
    onSelectChange(
      selectedIds.includes(id)
        ? selectedIds.filter(s => s !== id)
        : [...selectedIds, id]
    );
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th style={{ width: 40 }} className="text-center">
              <input
                type="checkbox"
                className="form-check-input"
                id={getUniqIdValue('chk', 'all')}
                ref={selectAllRef}
                checked={allSelected}
                onChange={toggleAll}
                title="Select / deselect all"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login ↓</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => {
              const checked = selectedIds.includes(user.id);
              return (
                <tr key={user.id} className={checked ? 'table-active' : ''}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={getUniqIdValue('chk', user.id)}
                      checked={checked}
                      onChange={() => toggleOne(user.id)}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatTime(user.last_login)}</td>
                  <td><StatusBadge status={user.status} /></td>
                 </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
