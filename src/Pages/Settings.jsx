import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiUser, FiLock, FiBell, FiDatabase, FiMail, FiCreditCard } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const tabs = [
    { id: 'account', icon: <FiUser />, label: 'Account' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'billing', icon: <FiCreditCard />, label: 'Billing' },
    { id: 'data', icon: <FiDatabase />, label: 'Data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <FiSettings className="text-3xl text-indigo-600 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 h-fit"
          >
            <nav>
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-white rounded-xl shadow-sm p-6"
          >
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiUser className="mr-2" /> Account Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Inventory Manager"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="manager@inventory.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>(UTC-05:00) Eastern Time</option>
                    <option>(UTC-06:00) Central Time</option>
                    <option>(UTC-07:00) Mountain Time</option>
                    <option>(UTC-08:00) Pacific Time</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkMode"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                    Enable Dark Mode
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiLock className="mr-2" /> Security Settings
                </h2>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Password</h3>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-indigo-600 hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Active Sessions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-gray-600">New York, USA • Last active 2 hours ago</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiBell className="mr-2" /> Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Enable Notifications</h3>
                      <p className="text-sm text-gray-600">Receive system notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive important updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="lowStock"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="lowStock" className="ml-2 block text-sm text-gray-700">
                          Low stock alerts
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="expiryAlerts"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="expiryAlerts" className="ml-2 block text-sm text-gray-700">
                          Product expiry alerts
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="orderUpdates"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="orderUpdates" className="ml-2 block text-sm text-gray-700">
                          Order updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="systemUpdates"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-700">
                          System updates
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Other tabs would go here */}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiCreditCard className="mr-2" /> Billing Information
                </h2>
                <p className="text-gray-600 mt-2">Billing settings will go here</p>
              </div>
            )}

            {activeTab === 'data' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiDatabase className="mr-2" /> Data Management
                </h2>
                <p className="text-gray-600 mt-2">Data settings will go here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;