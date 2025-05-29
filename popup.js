/**
 * Popup Script for Link Click Notifier
 * Handles popup UI interactions and i18n
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize internationalization
  initializeI18n();

  // Initialize popup functionality
  initializePopup();
});

function initializeI18n() {
  // Replace all elements with data-i18n attribute with localized text
  const i18nElements = document.querySelectorAll('[data-i18n]');

  i18nElements.forEach(element => {
    const messageKey = element.getAttribute('data-i18n');
    const localizedText = chrome.i18n.getMessage(messageKey);

    if (localizedText) {
      if (element.tagName === 'INPUT' && element.type === 'button') {
        element.value = localizedText;
      } else {
        element.textContent = localizedText;
      }
    }
  });

  // Update document title
  document.title = chrome.i18n.getMessage('popupTitle');
}

function initializePopup() {
  const notificationToggle = document.getElementById('notificationToggle');
  const toggleText = document.getElementById('toggleText');
  const statusMessage = document.getElementById('statusMessage');
  const clickCountElement = document.getElementById('clickCount');
  const linkCountElement = document.getElementById('linkCount');
  const lastClickUrl = document.getElementById('lastClickUrl');
  const resetStatsBtn = document.getElementById('resetStatsBtn');
  const testNotificationBtn = document.getElementById('testNotificationBtn');

  // Load current settings and stats
  loadCurrentState();

  // Toggle notification settings
  notificationToggle.addEventListener('change', function() {
    const enabled = this.checked;

    chrome.storage.sync.set({ notificationsEnabled: enabled }, function() {
      updateToggleUI(enabled);

      // Send message to content script to update its state
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'TOGGLE_NOTIFICATIONS',
            enabled: enabled
          }).catch(() => {
            // Ignore errors for tabs that don't have content script
          });
        }
      });
    });
  });

  // Reset statistics
  resetStatsBtn.addEventListener('click', function() {
    chrome.storage.sync.set({
      clickCount: 0,
      lastClickedUrl: '',
      lastClickTime: 0
    }, function() {
      updateStatsUI(0, '', '');
      showFeedback('Statistics reset successfully!');
    });
  });

  // Test notification
  testNotificationBtn.addEventListener('click', function() {
    testNotificationBtn.disabled = true;
    testNotificationBtn.textContent = 'Sending...';

    // Send test notification via background script
    chrome.runtime.sendMessage({
      type: 'TEST_NOTIFICATION'
    }, function() {
      setTimeout(() => {
        testNotificationBtn.disabled = false;
        testNotificationBtn.textContent = 'Test Notification';
        showFeedback('Test notification sent!');
      }, 1000);
    });
  });

  function loadCurrentState() {
    // Load notification settings and statistics
    chrome.storage.sync.get([
      'notificationsEnabled',
      'clickCount',
      'lastClickedUrl',
      'lastClickTime'
    ], function(result) {
      const enabled = result.notificationsEnabled !== false; // Default to true
      const clickCount = result.clickCount || 0;
      const lastUrl = result.lastClickedUrl || '';
      const lastTime = result.lastClickTime || 0;

      notificationToggle.checked = enabled;
      updateToggleUI(enabled);
      updateStatsUI(clickCount, lastUrl, lastTime);
    });

    // Get current page link count
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'GET_PAGE_INFO'
        }, function(response) {
          if (response && response.linkCount !== undefined) {
            linkCountElement.textContent = response.linkCount;
          }
        });
      }
    });
  }

  function updateToggleUI(enabled) {
    if (enabled) {
      toggleText.textContent = chrome.i18n.getMessage('disableNotifications');
      statusMessage.textContent = chrome.i18n.getMessage('notificationsEnabled');
      statusMessage.className = 'status-message';
    } else {
      toggleText.textContent = chrome.i18n.getMessage('enableNotifications');
      statusMessage.textContent = chrome.i18n.getMessage('notificationsDisabled');
      statusMessage.className = 'status-message disabled';
    }
  }

  function updateStatsUI(clickCount, lastUrl, lastTime) {
    clickCountElement.textContent = clickCount;

    if (lastUrl) {
      // Truncate long URLs
      const displayUrl = lastUrl.length > 40 ? lastUrl.substring(0, 40) + '...' : lastUrl;
      lastClickUrl.textContent = displayUrl;
      lastClickUrl.title = lastUrl; // Show full URL on hover
    } else {
      lastClickUrl.textContent = 'None';
      lastClickUrl.title = '';
    }
  }

  function showFeedback(message) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #28a745;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }, 2000);
  }
}

// Handle background script messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'STATS_UPDATED') {
    const clickCountElement = document.getElementById('clickCount');
    const lastClickUrl = document.getElementById('lastClickUrl');

    if (clickCountElement) {
      clickCountElement.textContent = request.clickCount;
    }

    if (lastClickUrl && request.lastUrl) {
      const displayUrl = request.lastUrl.length > 40 ?
        request.lastUrl.substring(0, 40) + '...' : request.lastUrl;
      lastClickUrl.textContent = displayUrl;
      lastClickUrl.title = request.lastUrl;
    }
  }
});
