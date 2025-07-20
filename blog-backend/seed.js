import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Blog from './models/Blog.js'
import Admin from './models/Admin.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb', {
      family: 4 // Force IPv4
    })
    console.log('Connected to MongoDB')

    // Clear existing data
    await Blog.deleteMany({})
    await Admin.deleteMany({})
    console.log('Cleared existing data')

    // Create admin user
    const admin = new Admin({
      username: process.env.SEED_ADMIN,
      email: process.env.SEED_ADMIN_EMAIL,
      password: process.env.SEED_ADMIN_PW
    })
    await admin.save()
    console.log('Admin user created (username: ', process.env.SEED_ADMIN, 'password: ', process.env.SEED_ADMIN_PW)

    // Create sample blogs
    const sampleBlogs = [
      {
        title: "Chill Jazz Fusion: Nujabes x Yo‑Yo‑Ma",
        content: "Blends cello warmth with laid-back beats, exploring fusion of classical and lo‑fi jazz textures.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=trCIjDlzjyg",
        level: "beginner",
        description: "Yo‑Yo‑Ma cello meets Nujabes-style lo‑fi beats—perfect for focus & relaxation.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Relaxing Cello Jazz – Cozy Cafe Music",
        content: "Smooth cello melodies set a warm café atmosphere, ideal for unwinding after a long day.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=umwZPXM0t08",
        level: "beginner",
        description: "Cozy cello jazz mix for relaxation and calm focus.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "F.I.L.O (Nujabes)",
        content: "Warm Rhodes chords & mellow jazz-hop rhythms create a peaceful, study-ready environment.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=7AjHIIjrC8E&list=RD7AjHIIjrC8E&start_radio=1",
        level: "beginner",
        description: "Lo‑fi jazz mix inspired by Nujabes—study, sleep, chill.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "SNOOPY JAZZ",
        content: "Cello and soft jazz combine for a serene evening ambience—perfect to wind down.",
        theme: "SNOOPY",
        youtubeLink: "https://www.youtube.com/live/me7D8rWXSJk?si=HEESB8VvH6Us292z",
        level: "beginner",
        description: "Gentle evening cello jazz to relax and unwind.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Shortcat's latest youtube vid!",
        content: "best ever cat!",
        theme: "MARIOKART",
        youtubeLink: "https://youtu.be/9mgpWUGLrlA?si=k0S34XaPQVALIzAO",
        level: "beginner",
        description: "My fav youtuber!",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Eric Clapton-Layla",
        content: "Cello-led jazz background music tailored for focus, study, and a chilled coffee shop vibe.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=pKwQlm-wldA&list=RDpKwQlm-wldA&start_radio=1",
        level: "beginner",
        description: "Instrumental cello jazz for concentration and calm.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "KIRINJI - Favorite - japanese pop",
        content: "Compilation of Jazz tracks that Nujabes sampled, giving insight into his musical roots.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=jitvFVIEeSo&list=RDjitvFVIEeSo&start_radio=1",
        level: "intermediate",
        description: "Explore original jazz sources behind Nujabes’ work.",
        duration: "30+ minutes",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Wicked Game -  Chris Isaak",
        content: "Soft cello and piano set within a jazz bar style—a relaxing backdrop for any evening.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=ozv8ugNm0P0&list=RDozv8ugNm0P0&start_radio=1",
        level: "beginner",
        description: "Jazz bar-style cello and piano for soothing ambiance.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Best of Nujabes – Compilation Mix",
        content: "A deeper dive into Nujabes’ classic works—jazzy, lo‑fi, and emotional.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=MSOZm4Deylg",
        level: "intermediate",
        description: "Extended mix featuring Nujabes’ most beloved tracks.",
        duration: "2 hours",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Animal Crossing BGM",
        content: "Latin jazz rhythms & cello blend to form a warm, lounge-style relaxation experience.",
        theme: "Music",
        youtubeLink: "https://youtu.be/wSE84K1BwGI?si=H3k97PaDt2kroj4N",
        level: "beginner",
        description: "Latin‑infused cello jazz for deep relaxation.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Word's end rhapsody - nujabes",
        content: "Cello meets Latin jazz flavor, suitable for nature-inspired relaxation settings.",
        theme: "Music",
        youtubeLink: "https://youtu.be/0XJFSTYryv4?si=rzCGvHsnAWtz-pEb",
        level: "beginner",
        description: "Latin lounge jazz with soothing cello for tranquility.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      },
      {
        title: "Ordinary Joe - nujabes",
        content: "A calm setting evoked by cello and Latin jazz—ideal for sunset mood and reflection.",
        theme: "Music",
        youtubeLink: "https://www.youtube.com/watch?v=LbeiNME75ZE&list=RDMM0XJFSTYryv4&index=14",
        level: "beginner",
        description: "Sunset-inspired cello & Latin jazz for peaceful moments.",
        duration: "1 hour",
        relatedBlogs: [],
        published: true
      }
    ]

    await Blog.insertMany(sampleBlogs)
    console.log('Sample blogs created')

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedData()