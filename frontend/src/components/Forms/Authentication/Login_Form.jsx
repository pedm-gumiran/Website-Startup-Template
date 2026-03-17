import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input_Text from '../../Input_Fields/Input_Text';
import Input_Password from '../../Input_Fields/Input_Password';
import Button from '../../Buttons/Button';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    setLoading(true);
    
    // Simulate login process (authentication disabled)
    setTimeout(() => {
      setLoading(false);
      // Redirect to dashboard
      navigate('/home', { replace: true });
    }, 1000);
  };

  const isFormValid = formData.email.trim() && formData.password.trim();

  return (
    <section className="md:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 md:px-10 border border-gray-300">
      <div className="w-full max-w-sm">
        <header className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to REIMS
            </h2>
            <p className="text-green-100">
              Research Extension Inventory Management System
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input_Text
            label="Email"
            id="email"
            name="email"
            placeholder="Please enter your email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="font-semibold"
            text_ClassName={loading ? 'opacity-50 cursor-not-allowed' : ''}
            disabled={loading}
          />

          <Input_Password
            label="Password"
            id="password"
            name="password"
            placeholder="Please enter your password"
            required
            value={formData.password}
            onChange={handleChange}
            className="font-semibold"
            password_className={loading ? 'opacity-50 cursor-not-allowed' : ''}
            disabled={loading}
          />
          {/*  Forgot Password link */}
          <div className="text-right -mt-4 ">
            <Link
              to="/forgot_password"
              className="text-sm text-green-600 hover:text-green-800 hover:underline font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            label={'Login'}
            isLoading={loading}
            loadingText="Logging in ...."
            type="submit"
            className={`bg-gradient-to-r from-green-500 to-emerald-600 w-full text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 ${
              !isFormValid || loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid || loading}
          />
        </form>
      </div>
    </section>
  );
}
