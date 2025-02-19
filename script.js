
body {
    font-family: 'Orbitron', sans-serif;
    background-color: #0f0c29;
    color: #ffffff;
    text-align: center;
    padding: 20px;
    margin: 0;
    overflow: hidden;
}

.container {
    position: relative;
    z-index: 1;
}

header h1 {
    font-size: 2rem;
    color: #00d2ff;
    margin: 0;
}

header p {
    font-size: 1rem;
    color: #a8a8a8;
    margin: 5px 0 20px;
}

#planet-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.game {
    position: relative;
    z-index: 2;
}

.stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.stat {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
}

.stat span:first-child {
    margin-right: 5px;
    color: #00d2ff;
}

.actions button {
    background-color: #00d2ff;
    color: #0f0c29;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-bottom: 10px;
}

.actions button:hover {
    background-color: #00a8cc;
    }
