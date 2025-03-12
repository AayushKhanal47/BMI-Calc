document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const unitBtns = document.querySelectorAll('.unit-btn');
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');

    // State
    let currentUnit = 'metric';

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Unit switching
    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const unit = btn.getAttribute('data-unit');
            
            // Update active unit button
            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update unit labels
            if (unit === 'metric') {
                heightUnit.textContent = '(cm)';
                weightUnit.textContent = '(kg)';
                heightInput.placeholder = 'e.g. 175';
                weightInput.placeholder = 'e.g. 70';
            } else {
                heightUnit.textContent = '(in)';
                weightUnit.textContent = '(lbs)';
                heightInput.placeholder = 'e.g. 69';
                weightInput.placeholder = 'e.g. 154';
            }
            
            // Update current unit and reset form
            currentUnit = unit;
            resetForm();
        });
    });

    // Calculate BMI
    calculateBtn.addEventListener('click', () => {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        if (!height || !weight) {
            alert('Please enter both height and weight');
            return;
        }
        
        let bmi;
        
        if (currentUnit === 'metric') {
            // Metric: weight (kg) / height (m)^2
            const heightInMeters = height / 100;
            bmi = weight / (heightInMeters * heightInMeters);
        } else {
            // Imperial: (weight (lbs) * 703) / height (inches)^2
            bmi = (weight * 703) / (height * height);
        }
        
        // Round to 1 decimal place
        bmi = parseFloat(bmi.toFixed(1));
        
        // Display result
        bmiValue.textContent = bmi;
        
        // Determine BMI category
        let category;
        let categoryClass;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            categoryClass = 'normal';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            categoryClass = 'overweight';
        } else {
            category = 'Obesity';
            categoryClass = 'obesity';
        }
        
        bmiCategory.textContent = category;
        
        // Remove all category classes and add the current one
        bmiCategory.className = 'bmi-category';
        bmiCategory.classList.add(categoryClass);
        
        // Show result
        resultDiv.classList.remove('hidden');
    });

    // Reset form
    resetBtn.addEventListener('click', resetForm);

    function resetForm() {
        heightInput.value = '';
        weightInput.value = '';
        resultDiv.classList.add('hidden');
    }
});