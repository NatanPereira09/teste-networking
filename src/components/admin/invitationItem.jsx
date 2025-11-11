import Button from "../../components/ui/button";

export default function InvitationItem({ invitation, onCopy }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800">{invitation.name}</h3>
          <p className="text-sm text-gray-500">{invitation.email}</p>
          {invitation.company && (
            <p className="text-sm text-gray-400">{invitation.company}</p>
          )}
        </div>

        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
          {invitation.status}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-600 truncate">
          <strong>Link de convite:</strong>{" "}
          <span className="font-mono text-indigo-600">
            {invitation.link}
          </span>
        </p>
      </div>

      <div className="flex justify-end mt-4">
        <Button color="indigo" onClick={() => onCopy(invitation.link)}>
          Copiar link
        </Button>
      </div>
    </div>
  );
}
