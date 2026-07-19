import { useState } from "react";
import API from "../services/api";

const initialFields = [];

function QRForm({ setQrImage, setQrDetails }) {
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState(initialFields);
  const [values, setValues] = useState({});
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [loading, setLoading] = useState(false);

  const addField = () => {
    const label = fieldLabel.trim();
    if (!label) {
      alert("Please enter a field label.");
      return;
    }

    if (fields.some((field) => field.label.toLowerCase() === label.toLowerCase())) {
      alert("A field with that label already exists.");
      return;
    }

    const newField = {
      id: Date.now(),
      label,
      type: fieldType,
      placeholder: `Enter ${label.toLowerCase()}`
    };

    setFields((prev) => [...prev, newField]);
    setValues((prev) => ({ ...prev, [label]: "" }));
    setFieldLabel("");
  };

  const removeField = (id) => {
    const fieldToRemove = fields.find((field) => field.id === id);
    if (!fieldToRemove) return;

    setFields((prev) => prev.filter((field) => field.id !== id));
    setValues((prev) => {
      const { [fieldToRemove.label]: removed, ...rest } = prev;
      return rest;
    });
  };

  const updateValue = (id, newValue) => {
    const field = fields.find((item) => item.id === id);
    if (!field) return;
    setValues((prev) => ({ ...prev, [field.label]: newValue }));
  };

  const generateQR = async () => {
    if (!fields.length) {
      alert("Add at least one field before generating a QR code.");
      return;
    }

    const hasValue = Object.values(values).some((value) => value.trim() !== "");
    if (!hasValue) {
      alert("Fill in at least one field before generating a QR code.");
      return;
    }

    const payload = {
      title: formTitle,
      details: values
    };

    try {
      setLoading(true);
      const response = await API.post(
        "/generate",
        { data: payload },
        { responseType: "blob" }
      );

      const imageURL = URL.createObjectURL(response.data);
      setQrImage(imageURL);
      setQrDetails(payload);
    } catch (error) {
      console.error(error);
      alert("QR generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">Create a Custom QR Form</h2>

      <div className="space-y-4">
        <label className="block text-slate-300">Form Title</label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="User Details"
          className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-8 p-6 rounded-3xl bg-slate-950 border border-slate-800">
        <h3 className="text-xl font-semibold mb-4">Add a new field</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            placeholder="Field label (e.g. Email)"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">Phone</option>
            <option value="url">URL</option>
            <option value="number">Number</option>
          </select>
        </div>
        <button
          type="button"
          onClick={addField}
          className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
        >
          Add Field
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Form Fields</h3>
        {fields.map((field) => (
          <div key={field.id} className="mb-4 grid gap-4 sm:grid-cols-[1fr_auto] items-start">
            <div>
              <label className="block text-slate-300 mb-2">{field.label}</label>
              <input
                type={field.type}
                value={values[field.label] || ""}
                onChange={(e) => updateValue(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="mt-7 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={generateQR}
        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:scale-[1.02] transition"
      >
        {loading ? "Generating..." : "Generate QR"}
      </button>
    </div>
  );
}

export default QRForm;
