"use client";
import React from 'react';

const ProtectedRoute = ({ children }) => {
  // --- BYPASS LOGIN FOR DEVELOPMENT ---
  // We strictly return the 'children' (the page content) 
  // without running any authentication checks.
  return <>{children}</>;
};

export default ProtectedRoute;