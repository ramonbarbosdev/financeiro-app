import { Form } from "react-bootstrap";

export function FormGroupDinamico({ fields, formData, handleChange }) {
    return (
        <div>
            {fields.map((field) => (
                <Form.Group key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    {field.type === "select" ? (
                        <Form.Select
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            disabled={field.disabled}
                        >
                            <option value="">Selecione uma opção</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    ) : (
                        <Form.Control
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                            disabled={field.disabled}
                        />
                    )}
                </Form.Group>
            ))}
        </div>
    );
}