import { useState, useEffect, useRef } from "react";

const useForm = (callback, validate) => {
  const isFirst = useRef(true);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isFirst.current) {
      if (Object.keys(errors).length === 0) {
        callback(form);
      }
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (!isFirst.current) {
      validation();
    }
  }, [form]);

  const initialValues = (value) => {
    setForm(value);
  };

  const handleSubmit = () => {
    isFirst.current = false;
    setErrors(validate(form));
    setIsSubmitting(!isSubmitting);
  };

  const validation = () => {
    setErrors(validate(form));
  };

  const handleChange = (value, name) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const resetForm = () => {
    setForm({});
    setErrors({});
    isFirst.current = true;
  };

  return {
    handleChange,
    handleSubmit,
    initialValues,
    resetForm,
    form,
    errors,
  };
};

export default useForm;
