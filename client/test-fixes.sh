#!/bin/bash
echo "Starting React development server..."
echo "Testing component fixes for:"
echo "1. DropdownList - should parse 'list' field instead of 'items'"
echo "2. TextWithTitle - should use 'header' field for title display"
echo "3. RandomH2 - should use 'children' field for text content"
echo "4. RandomParagraph - should properly handle escaped newlines"
echo ""
echo "Visit these URLs to test:"
echo "http://localhost:3000/test-user-components (User's specific problematic components)"
echo "http://localhost:3000/test-components (General component tests)"
echo ""

cd /c/Users/User10/Desktop/afm/afm-academy/client
npm start
