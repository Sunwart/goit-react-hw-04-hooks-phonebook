import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`,
    )
    .required('Please enter your name, it is required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits (at least 5 symbols long), it can contain spaces, dashes, parentheses and can start with +',
    )
    .required('Please enter your phone number, it is required'),
});

const ContactForm = ({ submit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleContactInput = values => {
    setName(values.name);
    setNumber(values.number);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ name, number }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleContactInput(values);
        submit(values);
        handleContactInput({ name: '', number: '' });
        setSubmitting(false);
      }}
    >
      <Form autoComplete="off">
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </label>

        <label>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" />
        </label>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
