import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        request: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleContinue = () => {
        setShowModal(false);
        setFormData({
            name: '',
            email: '',
            request: ''
        });
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="contact-us-container">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="request">Request</label>
                            <textarea
                                id="request"
                                name="request"
                                value={formData.request}
                                onChange={handleChange}
                                rows={5}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>
            </main>
            <Footer />

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <p>Thank you for your message.</p>
                        <div className="modal-actions">
                            <button onClick={handleContinue}>Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsPage;
