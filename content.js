/**
 * Content Script for Link Click Notifier
 * Detects link clicks and sends messages to background script
 */

(function() {
  'use strict';

  console.log('Link Click Notifier: Content script loaded');

  // Check if notifications are enabled
  chrome.storage.sync.get(['notificationsEnabled'], function(result) {
    const enabled = result.notificationsEnabled !== false; // Default to true

    if (enabled) {
      initializeLinkClickDetector();
    }
  });

  function initializeLinkClickDetector() {
    // Add event listener for link clicks
    document.addEventListener('click', handleLinkClick, true);

    // Listen for storage changes to enable/disable notifications dynamically
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (namespace === 'sync' && changes.notificationsEnabled) {
        if (changes.notificationsEnabled.newValue) {
          document.addEventListener('click', handleLinkClick, true);
        } else {
          document.removeEventListener('click', handleLinkClick, true);
        }
      }
    });
  }

  function handleLinkClick(event) {
    const target = event.target;

    // Check if the clicked element is a link or inside a link
    const link = target.closest('a[href]');

    if (link && link.href) {
      // Prevent the click event from propagating to avoid multiple notifications
      // Note: We don't preventDefault() to allow normal link navigation

      // Get the href attribute
      const url = link.href;

      // Send message to background script
      chrome.runtime.sendMessage({
        type: 'LINK_CLICKED',
        url: url,
        text: link.textContent.trim() || link.getAttribute('aria-label') || 'Link',
        timestamp: Date.now()
      }).catch(error => {
        console.log('Error sending message:', error);
      });

      console.log('Link clicked:', url);
    }
  }

  // Listen for messages from popup or background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'GET_PAGE_INFO') {
      sendResponse({
        url: window.location.href,
        title: document.title,
        linkCount: document.querySelectorAll('a[href]').length
      });
    }
  });

})();
