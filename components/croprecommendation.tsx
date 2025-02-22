import { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    Ph: '',
    Rainfall: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const values = Object.values(formData);
    if (values.some(v => v.trim() === '')) {
      setError('All fields are required');
      return false;
    }
    if (values.some(v => isNaN(Number(v)))) {
      setError('All values must be valid numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setResult('');

    try {
      const numericData = {
        Nitrogen: parseFloat(formData.Nitrogen),
        Phosphorus: parseFloat(formData.Phosphorus),
        Potassium: parseFloat(formData.Potassium),
        Temperature: parseFloat(formData.Temperature),
        Humidity: parseFloat(formData.Humidity),
        Ph: parseFloat(formData.Ph),
        Rainfall: parseFloat(formData.Rainfall)
      };

      const response = await axios.post('http://localhost:5000/predict', numericData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status === 'success') {
        setResult(`${response.data.crop} is the best crop to be cultivated`);
      } else {
        setError(response.data.error || 'Server returned unexpected response');
      }
    } catch (err: any) {
      const serverError = err.response?.data?.error;
      setError(serverError || 'Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="container bg-light p-4 rounded shadow">
        <h1 className="text-center text-success mb-4">
          Crop Recommendation System <span>🌱</span>
        </h1>

        <Form onSubmit={handleSubmit}>
          <div className="row mb-3">
            {['Nitrogen', 'Phosphorus', 'Potassium'].map((nutrient) => (
              <div className="col-md-4" key={nutrient}>
                <Form.Label>{nutrient}</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  name={nutrient}
                  placeholder={`Enter ${nutrient}`}
                  value={formData[nutrient as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="row mb-3">
            {['Temperature', 'Humidity', 'Ph'].map((field) => (
              <div className="col-md-4" key={field}>
                <Form.Label>
                  {field} {field === 'Temperature' && '(°C)'}
                  {field === 'Humidity' && '(%)'}
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <Form.Label>Rainfall (mm)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="Rainfall"
                placeholder="Enter Rainfall in mm"
                value={formData.Rainfall}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="text-center">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="px-5 py-2"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Processing...</span>
                </>
              ) : (
                'Get Recommendation'
              )}
            </Button>
          </div>
        </Form>

        {result && (
          <Card className="mt-4 bg-dark text-white">
            <Card.Img variant="top" src="/img.jpg" />
            <Card.Body>
              <Card.Title>Recommended Crop:</Card.Title>
              <Card.Text className="fs-5">{result}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;