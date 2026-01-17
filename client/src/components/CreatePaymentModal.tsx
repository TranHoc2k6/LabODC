import { useState } from "react";
import { paymentAPI } from "../api/payment";

export default function CreatePaymentModal({ onClose, onSuccess }: any) {
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const handleCreate = async () => {
    await paymentAPI.create({
      project_id: Number(projectId),
      amount: Number(amount),
      payment_method: method,
    });
    onSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Payment</h3>

        <input
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Payment Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleCreate}>
            Create
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
