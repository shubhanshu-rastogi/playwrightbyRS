import { test, expect } from '@playwright/test';
import { AngularPracticePage } from '../page-objects/angularPracticePage';

test('Fill and submit Angular practice form', async ({ page }) => {
  const form = new AngularPracticePage(page);

  await form.navigate();

  await form.fillUserForm({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    gender: 'Male',
    employmentStatus: 'Student',
    dob: '1995-05-20',
  });

  await form.verifySuccessMessage('Success!');
});