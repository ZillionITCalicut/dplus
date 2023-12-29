import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import BASE_URL from '../../../../../../config';

const AddProject = ({ onProjectAdded }) => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            setErrorMessage('');
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const [formData, setFormData] = useState({
        id: sessionStorage.getItem('id91') || '',
        projectName: '',
        projectOwnerName: '',
        phone: '',
        email: '',
        city: '',
        zip: '',
        address: '',
        username: '',
        password: '',
        confirmPassword: '',
        status: 'Active'
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        isValid: true,
        message: '',
    });

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }, []);

    const passwordValidationMessage = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }

        if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            return 'Password must contain at least one letter and one number.';
        }

        return '';
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            password,
        }));

        const message = passwordValidationMessage(password);
        setPasswordValidation({
            isValid: message === '',
            message,
        });
    };

    // Inside the component function
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Inside the component function
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Convert email to lowercase
        const lowercasedValue = name === 'email' ? value.toLowerCase() : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: lowercasedValue,
        }));
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);


        // Validate email
        if (!emailRegex.test(formData.email)) {
            // Handle invalid email
            setErrorMessage('Invalid email');
            return;
        }

        // Validate phone number
        if (!phoneRegex.test(formData.phone)) {
            // Handle invalid phone number
            setErrorMessage('Invalid phone number');
            return;
        }

        // Validate password
        if (!passwordRegex.test(formData.password)) {
            setErrorMessage('Invalid password. Password must contain at least 8 characters, including at least one letter and one number.');
            return;
        }

        // Confirm password
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (form.checkValidity()) {
            /* console.log(formData); */
            try {
                const response = await axios.post(`${BASE_URL}/Register-Project-SuperAdmin`, formData);
                console.log(response.data);
                if (onProjectAdded) {
                    onProjectAdded();
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='p-3'>
            <div className='text-start mb-3 mt-3 fs-5'>
                <i className="fa-solid fa-hand-holding-hand"></i>
                <span className='ms-2'>Project Details</span>
            </div>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Project Name"
                        name='projectName'
                        value={formData.projectName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Project Owner Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Project Owner Name"
                        name='projectOwnerName'
                        value={formData.projectOwnerName}
                        onChange={handleInputChange}
                    />

                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                    />
                </Form.Group>

            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>E-Mail</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="E-Mail"
                            aria-describedby="inputGroupPrepend"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a E-Mail.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom05">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Pin Code"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        pattern="\d{1,6}"
                        maxLength="6"
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required />
                </Form.Group>
            </Row>

            <div className='text-start mb-3 mt-3 fs-5'>
                <i className="fa-solid fa-lock"></i>
                <span className='ms-2'>Login</span>
            </div>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
                        pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                        isInvalid={!passwordValidation.isValid}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordValidation.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                    />
                </Form.Group>
            </Row>
            <Row>
                <div className='text-danger text-center mb-3 mt-5'>
                    {errorMessage}
                </div>
            </Row>
            <Button type="button" onClick={handleSubmit} className='w-100'>Submit form</Button>
        </Form>
    );
}

export default AddProject;
