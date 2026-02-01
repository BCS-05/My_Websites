from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import hashlib
import os
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import threading

app = Flask(__name__)
app.secret_key = 'clin-tech-secret-key-2025'
CORS(app, supports_credentials=True)

# Email configuration (Update with your email credentials)
EMAIL_CONFIG = {
    'sender': 'clintech.camp@gmail.com',  # Update with your email
    'password': 'your_email_password',    # Update with your email app password
    'smtp_server': 'smtp.gmail.com',
    'smtp_port': 587
}

def send_welcome_email(email, fullname):
    """Send welcome email to new user"""
    def send_email():
        try:
            msg = MIMEMultipart()
            msg['From'] = EMAIL_CONFIG['sender']
            msg['To'] = email
            msg['Subject'] = '🎉 Welcome to CLIN-TECH Code Camp!'
            
            # HTML email content
            html = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin-bottom: 10px;">🎉 Congratulations!</h1>
                        <h2 style="color: #1e293b;">Welcome to CLIN-TECH Code Camp</h2>
                    </div>
                    
                    <p>Dear <strong>{fullname}</strong>,</p>
                    
                    <p>Congratulations on successfully registering for CLIN-TECH Code Camp! 🎊</p>
                    
                    <p>We're excited to have you join our community of passionate programmers and developers. 
                    Your journey to mastering programming skills starts now!</p>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="color: #2563eb; margin-top: 0;">Your Account Details:</h3>
                        <p><strong>Full Name:</strong> {fullname}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Registration Date:</strong> {datetime.now().strftime('%B %d, %Y')}</p>
                    </div>
                    
                    <p><strong>Here's what you can do next:</strong></p>
                    <ol>
                        <li>Explore our comprehensive programming courses</li>
                        <li>Start learning Python, Web Development, Java, and more</li>
                        <li>Join our community of learners</li>
                        <li>Track your progress in your dashboard</li>
                    </ol>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="http://localhost:5000/dashboard" 
                           style="background: linear-gradient(to right, #2563eb, #7c3aed); 
                                  color: white; 
                                  padding: 12px 30px; 
                                  text-decoration: none; 
                                  border-radius: 25px; 
                                  font-weight: bold;
                                  display: inline-block;">
                            Access Your Dashboard
                        </a>
                    </div>
                    
                    <p>If you have any questions or need assistance, feel free to contact us at 
                    <a href="mailto:support@clintech.com">support@clintech.com</a>.</p>
                    
                    <p>Happy Coding! 💻</p>
                    
                    <p>Best regards,<br>
                    <strong>The CLIN-TECH Team</strong><br>
                    <em>Transforming Beginners into Professional Programmers</em></p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
                    
                    <div style="text-align: center; color: #64748b; font-size: 12px;">
                        <p>CLIN-TECH Code Camp | Multimedia Lab, Rongai, Nairobi-00100</p>
                        <p>Phone: +254-707326661 | Email: mjanjezclint@gmail.com</p>
                        <p>© 2025 CLIN-TECH Code Camp. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(html, 'html'))
            
            # Connect to SMTP server and send email
            server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
            server.starttls()
            server.login(EMAIL_CONFIG['sender'], EMAIL_CONFIG['password'])
            server.send_message(msg)
            server.quit()
            
            print(f"Welcome email sent to {email}")
            
        except Exception as e:
            print(f"Failed to send email to {email}: {str(e)}")
    
    # Run email sending in background thread
    email_thread = threading.Thread(target=send_email)
    email_thread.start()

def init_db():
    conn = sqlite3.connect('clin_tech.db')
    cursor = conn.cursor()
    
    # Drop tables if they exist and recreate (for clean start)
    cursor.execute('DROP TABLE IF EXISTS user_courses')
    cursor.execute('DROP TABLE IF EXISTS user_sessions')
    cursor.execute('DROP TABLE IF EXISTS courses')
    cursor.execute('DROP TABLE IF EXISTS users')
    
    # Users table
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP,
            is_active INTEGER DEFAULT 1,
            email_verified INTEGER DEFAULT 0
        )
    ''')
    
    # User sessions table
    cursor.execute('''
        CREATE TABLE user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            session_token TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP,
            is_active INTEGER DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    # Courses table
    cursor.execute('''
        CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_name TEXT UNIQUE NOT NULL,
            description TEXT,
            duration_weeks INTEGER,
            difficulty TEXT,
            is_premium INTEGER DEFAULT 0
        )
    ''')
    
    # User courses table - SIMPLIFIED VERSION
    cursor.execute('''
        CREATE TABLE user_courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            course_name TEXT NOT NULL,
            enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            progress INTEGER DEFAULT 0,
            last_accessed TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    # Insert default courses
    default_courses = [
        ('Python Programming', 'Master Python from basics to advanced concepts', 8, 'Beginner', 0),
        ('Full Stack Web Development', 'Learn HTML, CSS, JavaScript, React, Node.js', 12, 'Intermediate', 0),
        ('Java & Spring Boot', 'Learn Java fundamentals and enterprise development', 10, 'Beginner', 0),
        ('C++ & System Programming', 'Deep dive into C++ and system-level programming', 10, 'Intermediate', 0),
        ('Data Structures & Algorithms', 'Master fundamental algorithms and data structures', 8, 'Advanced', 0),
        ('Modern JavaScript & Frameworks', 'Master ES6+, React, Vue.js, and TypeScript', 9, 'Intermediate', 0),
        ('AI & Machine Learning', 'Learn AI fundamentals and build intelligent systems', 14, 'Advanced', 1),
        ('Mobile App Development', 'Build iOS and Android apps with React Native/Flutter', 11, 'Intermediate', 1)
    ]
    
    for course in default_courses:
        cursor.execute('''
            INSERT INTO courses (course_name, description, duration_weeks, difficulty, is_premium)
            VALUES (?, ?, ?, ?, ?)
        ''', course)
    
    # Create default admin user
    admin_hash = hashlib.sha256('admin123'.encode()).hexdigest()
    cursor.execute('''
        INSERT OR IGNORE INTO users (fullname, email, username, password_hash)
        VALUES (?, ?, ?, ?)
    ''', ('System Admin', 'admin@clintech.com', 'admin', admin_hash))
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def get_db_connection():
    conn = sqlite3.connect('clin_tech.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')
    
    if not all([fullname, email, password]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    
    if len(password) < 6:
        return jsonify({'success': False, 'message': 'Password must be at least 6 characters'}), 400
    
    # Generate username from email
    username = email.split('@')[0]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if email already exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'message': 'Email already registered'}), 400
        
        # Insert new user
        password_hash = hash_password(password)
        cursor.execute('''
            INSERT INTO users (fullname, email, username, password_hash, email_verified)
            VALUES (?, ?, ?, ?, 1)
        ''', (fullname, email, username, password_hash))
        
        user_id = cursor.lastrowid
        
        # Get all free courses
        cursor.execute("SELECT course_name FROM courses WHERE is_premium = 0")
        free_courses = cursor.fetchall()
        
        # Enroll user in all free courses
        for course in free_courses:
            cursor.execute('''
                INSERT INTO user_courses (user_id, course_name, progress)
                VALUES (?, ?, 0)
            ''', (user_id, course['course_name']))
        
        conn.commit()
        
        # Send welcome email (comment out if email not configured)
        # send_welcome_email(email, fullname)
        
        # Generate session token for auto-login
        session_token = secrets.token_hex(32)
        expires_at = datetime.now() + timedelta(days=30)
        
        cursor.execute('''
            INSERT INTO user_sessions (user_id, session_token, expires_at)
            VALUES (?, ?, ?)
        ''', (user_id, session_token, expires_at))
        
        conn.commit()
        
        # Get user data with courses
        cursor.execute('''
            SELECT course_name, progress 
            FROM user_courses 
            WHERE user_id = ?
        ''', (user_id,))
        
        user_courses = cursor.fetchall()
        
        courses_data = []
        for course in user_courses:
            courses_data.append({
                'course_name': course['course_name'],
                'progress': course['progress']
            })
        
        user_data = {
            'id': user_id,
            'username': username,
            'fullname': fullname,
            'email': email,
            'session_token': session_token,
            'courses': courses_data
        }
        
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Registration successful! Welcome to CLIN-TECH!',
            'user': user_data
        }), 201
        
    except Exception as e:
        conn.rollback()
        conn.close()
        print(f"Registration error: {str(e)}")
        return jsonify({'success': False, 'message': f'Registration failed: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    remember_me = data.get('remember_me', False)
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Try to find user by email or username
    cursor.execute('''
        SELECT id, fullname, email, username, password_hash 
        FROM users 
        WHERE (email = ? OR username = ?) AND is_active = 1
    ''', (email, email))
    
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    # Verify password
    password_hash = hash_password(password)
    if user['password_hash'] != password_hash:
        conn.close()
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    # Generate new session token
    session_token = secrets.token_hex(32)
    expires_at = datetime.now() + timedelta(days=30 if remember_me else 1)
    
    # Store session
    cursor.execute('''
        INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES (?, ?, ?)
    ''', (user['id'], session_token, expires_at))
    
    # Update last login
    cursor.execute('''
        UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    ''', (user['id'],))
    
    conn.commit()
    
    # Get user's courses
    cursor.execute('''
        SELECT course_name, progress 
        FROM user_courses 
        WHERE user_id = ?
    ''', (user['id'],))
    courses = cursor.fetchall()
    
    user_data = {
        'id': user['id'],
        'fullname': user['fullname'],
        'email': user['email'],
        'username': user['username'],
        'session_token': session_token,
        'courses': [dict(course) for course in courses]
    }
    
    conn.close()
    
    return jsonify({
        'success': True,
        'message': 'Login successful!',
        'user': user_data
    }), 200

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    session_token = request.args.get('session_token')
    
    if not session_token:
        return jsonify({'authenticated': False}), 200
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT u.id, u.fullname, u.email, u.username
        FROM users u
        JOIN user_sessions us ON u.id = us.user_id
        WHERE us.session_token = ? 
        AND us.is_active = 1 
        AND u.is_active = 1
        AND us.expires_at > datetime('now')
    ''', (session_token,))
    
    session_data = cursor.fetchone()
    conn.close()
    
    if session_data:
        return jsonify({
            'authenticated': True,
            'user': dict(session_data)
        }), 200
    else:
        return jsonify({'authenticated': False}), 200

@app.route('/api/courses', methods=['GET'])
def get_courses():
    session_token = request.args.get('session_token')
    
    if not session_token:
        return jsonify({'success': False, 'message': 'Authentication required'}), 401
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Validate session
    cursor.execute('''
        SELECT user_id FROM user_sessions 
        WHERE session_token = ? AND is_active = 1 AND expires_at > datetime('now')
    ''', (session_token,))
    
    session_data = cursor.fetchone()
    
    if not session_data:
        conn.close()
        return jsonify({'success': False, 'message': 'Please login to access courses'}), 401
    
    user_id = session_data['user_id']
    
    # Get all courses with enrollment status
    cursor.execute('''
        SELECT c.*, 
               CASE WHEN uc.user_id IS NOT NULL THEN 1 ELSE 0 END as is_enrolled,
               COALESCE(uc.progress, 0) as progress
        FROM courses c
        LEFT JOIN user_courses uc ON c.course_name = uc.course_name AND uc.user_id = ?
        ORDER BY c.id
    ''', (user_id,))
    
    courses = cursor.fetchall()
    conn.close()
    
    return jsonify({
        'success': True,
        'courses': [dict(course) for course in courses]
    }), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    data = request.json
    session_token = data.get('session_token')
    
    if not session_token:
        return jsonify({'success': False, 'message': 'Session token required'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Invalidate session
    cursor.execute('''
        UPDATE user_sessions 
        SET is_active = 0 
        WHERE session_token = ? AND is_active = 1
    ''', (session_token,))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

@app.route('/api/enroll-course', methods=['POST'])
def enroll_course():
    data = request.json
    session_token = data.get('session_token')
    course_name = data.get('course_name')
    
    if not session_token or not course_name:
        return jsonify({'success': False, 'message': 'Missing parameters'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Validate session
    cursor.execute('''
        SELECT user_id FROM user_sessions 
        WHERE session_token = ? AND is_active = 1 AND expires_at > datetime('now')
    ''', (session_token,))
    
    session_data = cursor.fetchone()
    
    if not session_data:
        conn.close()
        return jsonify({'success': False, 'message': 'Please login first'}), 401
    
    user_id = session_data['user_id']
    
    # Check if course exists
    cursor.execute("SELECT id FROM courses WHERE course_name = ?", (course_name,))
    course = cursor.fetchone()
    
    if not course:
        conn.close()
        return jsonify({'success': False, 'message': 'Course not found'}), 404
    
    # Check if already enrolled
    cursor.execute('''
        SELECT id FROM user_courses 
        WHERE user_id = ? AND course_name = ?
    ''', (user_id, course_name))
    
    if cursor.fetchone():
        conn.close()
        return jsonify({'success': False, 'message': 'Already enrolled in this course'}), 400
    
    # Enroll in course
    cursor.execute('''
        INSERT INTO user_courses (user_id, course_name, progress)
        VALUES (?, ?, 0)
    ''', (user_id, course_name))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'message': f'Successfully enrolled in {course_name}!'
    }), 200

@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    session_token = request.args.get('session_token')
    
    if not session_token:
        return jsonify({'success': False, 'message': 'Authentication required'}), 401
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Validate session and get user data
    cursor.execute('''
        SELECT u.*, COUNT(uc.id) as course_count
        FROM users u
        JOIN user_sessions us ON u.id = us.user_id
        LEFT JOIN user_courses uc ON u.id = uc.user_id
        WHERE us.session_token = ? 
        AND us.is_active = 1 
        AND u.is_active = 1
        AND us.expires_at > datetime('now')
        GROUP BY u.id
    ''', (session_token,))
    
    user_data = cursor.fetchone()
    
    if not user_data:
        conn.close()
        return jsonify({'success': False, 'message': 'Invalid session'}), 401
    
    # Get user's courses with details
    cursor.execute('''
        SELECT uc.course_name, uc.progress, uc.enrolled_at,
               c.description, c.duration_weeks, c.difficulty
        FROM user_courses uc
        LEFT JOIN courses c ON uc.course_name = c.course_name
        WHERE uc.user_id = ?
        ORDER BY uc.enrolled_at DESC
    ''', (user_data['id'],))
    
    courses = cursor.fetchall()
    
    conn.close()
    
    return jsonify({
        'success': True,
        'user': dict(user_data),
        'courses': [dict(course) for course in courses]
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'CLIN-TECH Backend',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    print("=" * 50)
    print("CLIN-TECH Backend Server")
    print("=" * 50)
    print("Database: Initialized")
    print("Admin user: admin@clintech.com / admin123")
    print("Server running on: http://127.0.0.1:5000")
    print("API endpoints available:")
    print("  - POST /api/register")
    print("  - POST /api/login")
    print("  - GET  /api/check-auth")
    print("  - GET  /api/courses")
    print("  - POST /api/logout")
    print("=" * 50)
    app.run(debug=True, port=5000)