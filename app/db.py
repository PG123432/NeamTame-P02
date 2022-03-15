# Neam Time - Pat Ging, Aaron Contreras, Deven Maheshwari, David Chong, Ryan Wang
# SoftDev
# P02 - Client-Side Shenanigans 
# 2022-03-10

import sqlite3

DB_FILE = "WackAMole.db"

def setup():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("DROP TABLE IF EXISTS leaderboard")
    command = "CREATE TABLE leaderboard (username TEXT, score INTEGER, timestamp DATETIME DEFAULT (datetime('now','localtime')));"
    c.execute(command)

    c.execute("DROP TABLE IF EXISTS users")
    command = "CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, topscore INTEGER DEFAULT 100, timestamp DATETIME DEFAULT (datetime('now','localtime')));"
    c.execute(command)

    db.commit()
    db.close()

# User Database Stuff

# add new user name and password to users database if availible
def signup(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    # checks if username already exists
    c.execute("SELECT username FROM users WHERE username=?",[username])
    result = c.fetchone()


    if result != None:
        return "Error: Username already in use"

    else:
        c.execute('INSERT INTO users VALUES (null, ?, ?, null, null)',[username, password])
        db.commit()
        db.close()
        return False

# checks if username and password combination exists in database
def login(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("""SELECT username FROM users WHERE username=? AND password=?""",[username, password])
    result = c.fetchone()

    if result:
        return False
    else:
        return "Error: Either username or password is invalid"

# gets the user_id from the user_name
def get_id(username):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    user_id = None
    c.execute("SELECT user_id FROM users WHERE username=?", [username])
    row = c.fetchone()
    if row is not None:
        user_id = row[0]

    return user_id

# gets the username from the user_id
def get_username(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    username = None
    c.execute("SELECT username FROM users WHERE user_id=?", [user_id])
    row = c.fetchone()
    if row is not None:
        username = row[0]

    return username

# gets the topscore from the user_id
def get_topscore(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    topscore = None
    c.execute("SELECT topscore FROM users WHERE user_id=?", [user_id])
    row = c.fetchone()
    if row is not None:
        topscore = row[0]

    return topscore

# Leaderboard Database Stuff: 

# Add score and user to leaderboard
def addToLeaderboard(username, score):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute('INSERT INTO leaderboard (username, score) VALUES (?, ?)', [username, score])
    result = c.fetchone()

    db.commit()
    db.close()
    
    return result

# Gets top value of the leaderboard
def getLeaderboard():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute('SELECT * FROM leaderboard ORDER BY score ASC')
    top = c.fetchall()

    db.commit()
    db.close()

    return top

def main():
    print(getLeaderboard())

if __name__ == "__main__":
    main()
