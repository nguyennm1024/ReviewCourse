import decode from 'jwt-decode';

export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000';
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(username, password) {
        let data = {
            mail: username,
            password: password
        }
        return this.fetch(`${this.domain}/api/login`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res)
        })
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpried(token);
    }

    isTokenExpried(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now()/1000) return true;
            else return false;
        } catch(err) {
            return false;
        }
    }

    setToken(idToken) {
        return localStorage.setItem('id_token', idToken);
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) headers['Authorization'] = 'Bearer' + this.getToken();

        return fetch(url, {
            headers,
            ...options
        }).then(this._checkStatus)
        .then(response => response.json())
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) return response;
        else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}