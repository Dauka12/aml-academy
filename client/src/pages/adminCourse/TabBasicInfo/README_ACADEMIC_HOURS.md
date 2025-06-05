# Adding Academic Hours Field to Course Creation Process

## Overview
This document details the implementation of a new `academic_hours` field in the TabBasicInfo component of the Course Creation process. The field allows administrators to specify the number of academic hours for a course.

## Changes Made

### 1. Added New State Variable
- Added state for `academicHours` with appropriate initialization from props

### 2. Added Form Validation
- Added validation to ensure `academicHours` is greater than 0
- Included appropriate error messages

### 3. Added UI Elements
- Created a new TextField for `academicHours` with proper labeling and styling
- Placed it next to the price field for logical grouping
- Added appropriate input validation and error handling

### 4. Updated Backend Integration
- Modified the data sent to the backend to include the `academic_hours` field
- Updated the data fetching logic to handle the new field from backend responses

### 5. Improved Code Structure
- Created reusable components for better maintainability:
  - `CourseInfoFields.jsx`: Contains all form fields for course information
  - `ImageUploader.jsx`: Handles the course image upload functionality
  - `ActionButtons.jsx`: Contains the navigation and submission buttons

## How to Use
When creating or editing a course, you'll now find a new "Академические часы" field where you can enter the number of academic hours for the course. This field is required and must be greater than 0.

## Technical Notes
- The field is validated on both client and server sides
- The value is stored as a number in the database
- Default value is 0 (though validation prevents submission with this value)

## Future Improvements
- Consider adding a tooltip explaining what "academic hours" means
- Potentially add a field to distinguish between academic hours and practice hours
