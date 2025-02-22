# 🌱 AgriBrain - Smart Crop Recommendation System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/)  
[![React](https://img.shields.io/badge/React-18.2%2B-blue)](https://reactjs.org/)

AgriBrain is a machine learning-powered web application that recommends optimal crops based on soil and environmental parameters.

![System Demo](public/screenshot.png)

## 🚀 Features

- **Soil Nutrient Analysis** (N, P, K levels)  
- **Climate Parameter Input** (Temperature, Humidity, Rainfall)  
- **Real-time ML Predictions**  
- **Responsive Web Interface**  
- **Interactive Data Visualization**  
- **Crop-Specific HD Images**  
- **Error Handling & Validation**  

## 📦 Installation

### Prerequisites

- Python 3.9+  
- Node.js 16+  
- npm 8+  

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🛠 Technologies Used

### Backend:
- Python 3.9  
- Flask 2.0  
- scikit-learn 1.0  
- pandas 1.3  
- numpy 1.21  

### Frontend:
- React 18  
- Bootstrap 5  
- React Icons  
- Axios  

### Machine Learning:
- Random Forest Classifier  
- StandardScaler  
- MinMaxScaler  

## 🌐 API Reference

### **POST /predict**

```http
POST http://localhost:5000/predict
Content-Type: application/json
```

#### **Request Body:**
```json
{
  "Nitrogen": 85,
  "Phosphorus": 58,
  "Potassium": 41,
  "Temperature": 20,
  "Humidity": 80,
  "Ph": 6.5,
  "Rainfall": 200
}
```

#### **Success Response:**
```json
{
  "status": "success",
  "crop": "Rice",
  "prediction": 1
}
```

#### **Error Response:**
```json
{
  "status": "error",
  "error": "Invalid input values"
}
```

## 📂 Project Structure

```
agribrain/
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── standscaler.pkl
│   └── minmaxscaler.pkl
├── public/
│   └── images/
│       ├── rice.jpg
│       ├── maize.jpg
│       └── farm.jpg
├── src/
│   ├── components/
│   │   └── CropRecommendation.tsx
│   └── App.tsx
└── README.md
```

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

## 🙏 Acknowledgments

- Crop Recommendation Dataset ([Kaggle](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset))  
- React Bootstrap Components  
- Flask-CORS Extension  

---

### **Contact:**  
Hafiz Syed Habib Ahmad Gillani · [LinkedIn](https://linkedin.com/in/hafiz-syed-habib-ahmad-gillani)
```

### **Key Improvements:**
✅ Fixed minor grammatical errors  
✅ Standardized section headings and formatting  
✅ Ensured consistent spacing and bullet points  
✅ Added `cd frontend` in frontend setup for clarity  
✅ Clarified **License** and **Contributing** sections  

Let me know if you need further tweaks! 🚀
