import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  users = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Prince' },
    { id: 5, name: 'Ethan Hunt' },
    { id: 6, name: 'Fiona Gallagher' },
  ];

  companies = [
    { id: 1, name: 'Tech Corp' },
    { id: 2, name: 'Innovate Ltd' },
    { id: 3, name: 'Startup X' },
    { id: 4, name: 'Future Systems' },
    { id: 5, name: 'NextGen Solutions' },
    { id: 6, name: 'AlphaSoft' },
    { id: 7, name: 'BetaTech' },
    { id: 8, name: 'Cloud Innovations' },
    { id: 9, name: 'AI Pioneers' },
    { id: 10, name: 'CyberWave' },
    { id: 11, name: 'DataSphere' },
    { id: 12, name: 'Quantum Enterprises' },
    { id: 13, name: 'Green Energy Labs' },
    { id: 14, name: 'Digital Dynamics' },
    { id: 15, name: 'BlueOcean AI' },
    { id: 16, name: 'SmartHome Technologies' },
    { id: 17, name: 'FinTech Group' },
    { id: 18, name: 'MedTech Solutions' },
    { id: 19, name: 'EcoInnovate' },
    { id: 20, name: 'Neural Networks Inc.' }
  ];

  getUsers() {
    return this.users;
  }

  getCompanies() {
    return this.companies;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  getCompanyById(id: number) {
    return this.companies.find(company => company.id === id);
  }
}