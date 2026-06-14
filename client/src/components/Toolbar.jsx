export default function Toolbar({ selectedIds,users, onAction, loading, filter, onFilter }) {
  const hasSelection = selectedIds.length > 0;
  const selectedUsers = users.filter(u => selectedIds.includes(u.id));
  const allBlocked    = hasSelection && selectedUsers.every(u => u.status === 'blocked');

  return (
    <div className="d-flex align-items-center gap-2 p-2"
      style={{ borderBottom: '1px solid #dee2e6' }}>

      <button
        className="btn btn-sm d-flex align-items-center gap-1"
        style={{
          border: '1px solid #1a73e8',
          color: '#1a73e8',
          background: 'white',
          borderRadius: 6,
          padding: '4px 12px',
        }}
        onClick={() => onAction(allBlocked ? 'unblock' : 'block')}
        disabled={loading || !hasSelection}
        title={allBlocked ? 'Unblock selected' : 'Block selected'}
      >
        <i className={`bi ${allBlocked ? 'bi-unlock-fill' : 'bi-lock-fill'}`} 
        style={{ fontSize: 13 }} />
        <span style={{ fontSize: 13 }}>{allBlocked ? 'Unblock' : 'Block'}</span>
      </button>

      <button
        className="btn btn-sm"
        style={{
          border: '1px solid #dee2e6',
          background: 'white',
          borderRadius: 6,
          padding: '4px 9px',
        }}
        onClick={() => onAction('unblock')}
        disabled={loading || !hasSelection}
        title="Unblock selected users"
      >
        <i className="bi bi-unlock-fill" style={{ fontSize: 14, color: '#555' }} />
      </button>

      <button
        className="btn btn-sm"
        style={{
          border: '1px solid #dc3545',
          background: 'white',
          borderRadius: 6,
          padding: '4px 9px',
        }}
        onClick={() => onAction('delete')}
        disabled={loading || !hasSelection}
        title="Delete selected users"
      >
        <i className="bi bi-trash3-fill" style={{ fontSize: 14, color: '#dc3545' }} />
      </button>

      <button
        className="btn btn-sm"
        style={{
          border: '1px solid #dc3545',
          background: 'white',
          borderRadius: 6,
          padding: '4px 9px',
        }}
        onClick={() => onAction('deleteUnverified')}
        disabled={loading || !hasSelection}
        title="Delete unverified users from selection"
      >
        <i className="bi bi-person-x-fill" style={{ fontSize: 14, color: '#dc3545' }} />
      </button>

      <div className="flex-grow-1" />

      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Filter"
        value={filter}
        onChange={e => onFilter(e.target.value)}
        style={{ maxWidth: 180, borderRadius: 6 }}
      />
    </div>
  );
}
