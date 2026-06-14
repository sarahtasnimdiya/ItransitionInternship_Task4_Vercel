export default function Toolbar({ selectedIds, onAction, loading }) {
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="d-flex align-items-center gap-2 p-2 mb-3 border rounded bg-light">

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onAction('block')}
        disabled={loading || !hasSelection}
        title="Block selected users"
      >
        <i className="bi bi-lock-fill me-1" />
        Block
      </button>

      <button
        className="btn btn-outline-success btn-sm"
        onClick={() => onAction('unblock')}
        disabled={loading || !hasSelection}
        title="Unblock selected users"
      >
        <i className="bi bi-unlock-fill" />
      </button>

      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => onAction('delete')}
        disabled={loading || !hasSelection}
        title="Delete selected users"
      >
        <i className="bi bi-trash3-fill" />
      </button>

      <div className="vr" />

      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => onAction('deleteUnverified')}
        disabled={loading}
        title="Delete all unverified users"
      >
        <i className="bi bi-person-x-fill" />
      </button>

      {hasSelection && (
        <span className="ms-2 text-muted small">
          {selectedIds.length} selected
        </span>
      )}
    </div>
  );
}
