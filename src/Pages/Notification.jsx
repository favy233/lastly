import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiAlertCircle, FiInfo, FiX, FiFilter } from 'react-icons/fi';

const Notification = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Low stock alert',
      message: 'Product "Wireless Headphones" is running low (5 items left)',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New feature available',
      message: 'Inventory reports dashboard is now available',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 3,
      type: 'alert',
      title: 'Expiry warning',
      message: '3 products will expire in the next 7 days',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Order received',
      message: 'New order #INV-2023-056 has been placed',
      time: '2 days ago',
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <FiBell className="text-3xl text-indigo-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
            {unreadCount > 0 && (
              <span className="ml-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center text-gray-600">
              <FiFilter className="mr-2" />
              <span className="text-sm">Filter:</span>
            </div>
            {['all', 'alert', 'info', 'success'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 mt-1 mr-3 ${
                        notification.type === 'alert' ? 'text-red-500' :
                        notification.type === 'info' ? 'text-blue-500' :
                        'text-green-500'
                      }`}>
                        {notification.type === 'alert' ? <FiAlertCircle size={20} /> :
                         notification.type === 'info' ? <FiInfo size={20} /> :
                         <FiCheck size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-indigo-600"
                            title="Mark as read"
                          >
                            <FiCheck size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="text-gray-400 mb-2">
                  <FiBell size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                <p className="text-gray-500 mt-1">
                  {activeFilter === 'all' 
                    ? "You're all caught up!" 
                    : `No ${activeFilter} notifications`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Clear All Button */}
        {filteredNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex justify-end"
          >
            <button
              onClick={() => setNotifications([])}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
            >
              <FiX className="mr-1" /> Clear all notifications
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notification;