from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
import uuid

load_dotenv()

app = FastAPI(title="Vidya Baviskar Portfolio API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/vidya_portfolio")
client = MongoClient(MONGO_URL)
db = client.vidya_portfolio

# Pydantic models
class Project(BaseModel):
    id: str
    title: str
    description: str
    tech_stack: List[str]
    image_url: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    category: str
    featured: bool = False

class Certificate(BaseModel):
    id: str
    title: str
    issuer: str
    date: str
    image_url: str
    credential_url: Optional[str] = None

class Talk(BaseModel):
    id: str
    title: str
    event_name: str
    date: str
    description: str
    image_url: str
    video_url: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Sample data initialization
def init_sample_data():
    # Sample projects
    sample_projects = [
        {
            "id": str(uuid.uuid4()),
            "title": "AI-Powered Content Generator",
            "description": "A sophisticated content generation tool using GPT models to create engaging blog posts, social media content, and marketing copy with customizable tones and styles.",
            "tech_stack": ["Python", "OpenAI GPT", "Streamlit", "MongoDB", "Docker"],
            "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            "github_url": "https://github.com/vidyabaviskar/ai-content-generator",
            "demo_url": "https://ai-content-gen-demo.streamlit.app",
            "category": "Natural Language Processing",
            "featured": True
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Smart Chatbot for E-commerce",
            "description": "An intelligent customer service chatbot that handles product inquiries, order tracking, and provides personalized recommendations using machine learning.",
            "tech_stack": ["Python", "Rasa", "TensorFlow", "Flask", "Redis"],
            "image_url": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
            "github_url": "https://github.com/vidyabaviskar/ecommerce-chatbot",
            "demo_url": None,
            "category": "Conversational AI",
            "featured": True
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Computer Vision Art Generator",
            "description": "A creative AI application that transforms regular photos into artistic masterpieces using style transfer and generative adversarial networks.",
            "tech_stack": ["Python", "PyTorch", "OpenCV", "Gradio", "AWS"],
            "image_url": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
            "github_url": "https://github.com/vidyabaviskar/ai-art-generator",
            "demo_url": "https://huggingface.co/spaces/vidya/art-generator",
            "category": "Computer Vision",
            "featured": False
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Predictive Analytics Dashboard",
            "description": "A comprehensive business intelligence dashboard that uses machine learning to predict sales trends, customer behavior, and market opportunities.",
            "tech_stack": ["Python", "Scikit-learn", "Plotly", "FastAPI", "PostgreSQL"],
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            "github_url": "https://github.com/vidyabaviskar/predictive-dashboard",
            "demo_url": None,
            "category": "Machine Learning",
            "featured": False
        }
    ]

    # Sample certificates
    sample_certificates = [
        {
            "id": str(uuid.uuid4()),
            "title": "Google AI Platform Professional Certificate",
            "issuer": "Google Cloud",
            "date": "2024",
            "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
            "credential_url": "https://google.com/certificates/ai-platform"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "AWS Machine Learning Specialty",
            "issuer": "Amazon Web Services",
            "date": "2024",
            "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
            "credential_url": "https://aws.amazon.com/certification/certified-machine-learning-specialty/"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Deep Learning Specialization",
            "issuer": "DeepLearning.AI (Coursera)",
            "date": "2023",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            "credential_url": "https://coursera.org/verify/specialization/deep-learning"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Generative AI for Everyone",
            "issuer": "DeepLearning.AI",
            "date": "2024",
            "image_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
            "credential_url": "https://coursera.org/verify/generative-ai"
        }
    ]

    # Sample talks
    sample_talks = [
        {
            "id": str(uuid.uuid4()),
            "title": "The Future of Generative AI in Business",
            "event_name": "TechTalk Mumbai 2024",
            "date": "March 2024",
            "description": "Discussed the transformative potential of generative AI in various business sectors, covering practical applications and implementation strategies.",
            "image_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
            "video_url": "https://youtube.com/watch?v=example1"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Women in AI: Breaking Barriers",
            "event_name": "WomenTech Global Conference",
            "date": "January 2024",
            "description": "Empowering session about women's role in shaping the future of artificial intelligence and encouraging more diversity in tech.",
            "image_url": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
            "video_url": "https://youtube.com/watch?v=example2"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Building Ethical AI Systems",
            "event_name": "AI Ethics Summit 2024",
            "date": "February 2024",
            "description": "Deep dive into the importance of ethical considerations in AI development and deployment, with practical frameworks for responsible AI.",
            "image_url": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
            "video_url": None
        }
    ]

    # Insert sample data if collections are empty
    if db.projects.count_documents({}) == 0:
        db.projects.insert_many(sample_projects)
    
    if db.certificates.count_documents({}) == 0:
        db.certificates.insert_many(sample_certificates)
    
    if db.talks.count_documents({}) == 0:
        db.talks.insert_many(sample_talks)

# Initialize sample data on startup
@app.on_event("startup")
async def startup_event():
    init_sample_data()

# API Routes
@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    projects = list(db.projects.find({}, {"_id": 0}))
    return projects

@app.get("/api/projects/featured", response_model=List[Project])
async def get_featured_projects():
    projects = list(db.projects.find({"featured": True}, {"_id": 0}))
    return projects

@app.get("/api/certificates", response_model=List[Certificate])
async def get_certificates():
    certificates = list(db.certificates.find({}, {"_id": 0}))
    return certificates

@app.get("/api/talks", response_model=List[Talk])
async def get_talks():
    talks = list(db.talks.find({}, {"_id": 0}))
    return talks

@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    # Store contact message in database
    contact_data = message.dict()
    contact_data["timestamp"] = datetime.now()
    contact_data["id"] = str(uuid.uuid4())
    
    db.contact_messages.insert_one(contact_data)
    
    return {"message": "Contact message sent successfully!", "status": "success"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Vidya Baviskar Portfolio API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)