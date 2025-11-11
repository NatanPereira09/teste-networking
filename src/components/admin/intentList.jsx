import IntentItem from "./intentItem";

export default function IntentList({ intents, onApprove, onReject }) {
  if (!intents || intents.length === 0)
    return (
      <p className="text-center text-gray-500 mt-4">
        Nenhuma intenção pendente no momento.
      </p>
    );

  return (
    <div className="space-y-4 mt-4">
      {intents.map((intent) => (
        <IntentItem
          key={intent.id}
          intent={intent}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
