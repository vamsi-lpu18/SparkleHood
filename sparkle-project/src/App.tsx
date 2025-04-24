import { useState } from 'react'
import './App.css'

// Mock data structure for AI safety incidents
interface Incident {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  category: string;
}

const mockIncidents: Incident[] = [
  {
    id: 1,
    title: 'Model Bias in Hiring Algorithm',
    description: 'AI system showed bias against certain demographic groups in resume screening',
    severity: 'High',
    status: 'Open',
    date: '2024-04-20',
    category: 'Bias'
  },
  {
    id: 2,
    title: 'Privacy Data Leak',
    description: 'Sensitive user data was exposed through model outputs',
    severity: 'Critical',
    status: 'In Progress',
    date: '2024-04-18',
    category: 'Privacy'
  },
  {
    id: 3,
    title: 'Model Drift in Production',
    description: 'Model performance degraded significantly in production environment',
    severity: 'Medium',
    status: 'Resolved',
    date: '2024-04-15',
    category: 'Performance'
  }
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [showForm, setShowForm] = useState(false);
  const [expandedIncidents, setExpandedIncidents] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newIncident, setNewIncident] = useState<Partial<Incident>>({
    title: '',
    description: '',
    severity: 'Low',
    status: 'Open',
    category: ''
  });

  const toggleIncidentDetails = (incidentId: number) => {
    setExpandedIncidents(prev => {
      const newSet = new Set<number>();
      if (!prev.has(incidentId)) {
        newSet.add(incidentId);
      }
      return newSet;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newIncident.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!newIncident.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!newIncident.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setNewIncident(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddIncident = () => {
    if (validateForm()) {
      const incident: Incident = {
        id: incidents.length + 1,
        title: newIncident.title!,
        description: newIncident.description!,
        severity: newIncident.severity as Incident['severity'],
        status: newIncident.status as Incident['status'],
        date: new Date().toISOString().split('T')[0],
        category: newIncident.category!
      };
      setIncidents([...incidents, incident]);
      setNewIncident({
        title: '',
        description: '',
        severity: 'Low',
        status: 'Open',
        category: ''
      });
      setErrors({});
      setShowForm(false);
    }
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'all' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'severity') {
      const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });

  return (
    <div className="dashboard">
      <header>
        <h1>AI Safety Incident Dashboard</h1>
        <div className="controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="severity">Sort by Severity</option>
          </select>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Log New Incident'}
          </button>
        </div>
      </header>

      {showForm && (
        <div className="incident-form">
          <h2>Log New Incident</h2>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={newIncident.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description"
              value={newIncident.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="tag-container">
            <div className="tag-group">
              <label>Severity</label>
              <div className="tag-options">
                {['Critical', 'High', 'Medium', 'Low'].map((level) => (
                  <div
                    key={level}
                    className={`tag severity ${level.toLowerCase()} ${newIncident.severity === level ? 'selected' : ''}`}
                    onClick={() => setNewIncident({...newIncident, severity: level as Incident['severity']})}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>

            <div className="tag-group">
              <label>Status</label>
              <div className="tag-options">
                {['Open', 'In Progress', 'Resolved'].map((status) => (
                  <div
                    key={status}
                    className={`tag status ${status.toLowerCase().replace(' ', '-')} ${newIncident.status === status ? 'selected' : ''}`}
                    onClick={() => setNewIncident({...newIncident, status: status as Incident['status']})}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Category"
              value={newIncident.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={errors.category ? 'error' : ''}
            />
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <button onClick={handleAddIncident}>Submit</button>
        </div>
      )}

      <div className="incidents-list">
        {sortedIncidents.map(incident => (
          <div key={incident.id} className={`incident-card ${incident.severity.toLowerCase()}`}>
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <button 
                className="view-details-btn"
                onClick={() => toggleIncidentDetails(incident.id)}
              >
                {expandedIncidents.has(incident.id) ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            <div className={`incident-description ${expandedIncidents.has(incident.id) ? 'expanded' : ''}`}>
              {expandedIncidents.has(incident.id) && <p>{incident.description}</p>}
            </div>
            <div className="incident-meta">
              <span className={`severity ${incident.severity.toLowerCase()}`}>
                {incident.severity}
              </span>
              <span className={`status ${incident.status.toLowerCase().replace(' ', '-')}`}>
                {incident.status}
              </span>
              <span className="date">{incident.date}</span>
              <span className="category">{incident.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
