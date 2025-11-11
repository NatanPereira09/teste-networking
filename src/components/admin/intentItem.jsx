import Button from "../ui/button";

export default function IntentItem({ intent, onApprove, onReject }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800">{intent.name}</h3>
          <p className="text-sm text-gray-500">{intent.email}</p>
          {intent.company && (
            <p className="text-sm text-gray-400">{intent.company}</p>
          )}
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            intent.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : intent.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {intent.status}
        </span>
      </div>

      {intent.message && (
        <p className="text-sm text-gray-600 mt-3 italic">
          “{intent.message}”
        </p>
      )}

      <div className="flex gap-2 mt-4">
        {intent.status === "PENDING" && (
          <>
            <Button color="green" onClick={() => onApprove(intent.id)}>
              Aprovar
            </Button>
            <Button color="red" onClick={() => onReject(intent.id)}>
              Rejeitar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
