import { useRef, useEffect } from 'react';

function getUniqIdValue(prefix, id) {
  return `${prefix}-${id}`;
}

function formatDate(date) {
  if (!date) return <span className="text-muted">Never</span>;
  return new Date(date).toLocaleString();
}

function StatusBadge({ status }) {
  const map = { active: 'success', blocked: 'danger', unverified: 'warning text-dark' };
  return (
    <span className={`badge bg-${map[status] ?? 'secondary'}`}>
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
                  <td>{formatDate(user.last_login)}</td>
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
