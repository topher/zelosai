// // tests/accessControl.test.ts

// import { evaluateAccess } from '../lib/policyEvaluation';
// import { deductCredits } from '../lib/credits';
// import { checkFeatureLimit } from '../lib/limits';
// import { logUserAction } from '../lib/logging';
// import { getUserById, getUserSubscriptionTier } from '../lib/user';
// import { mockUsers } from '../mockData/users';
// import { User } from '@/app/types';
// import { getSubscriptionById, updateSubscriptionCredits } from '../lib/subscription';

// // Mock dependencies
// jest.mock('../lib/user');
// jest.mock('../lib/policyEvaluation');
// jest.mock('../lib/limits');
// jest.mock('../lib/logging');
// jest.mock('../lib/notifications');
// jest.mock('../lib/subscription');

// // Import handleCreditThresholdNotifications if it's a separate function
// // If it's within the same module, ensure it's mocked appropriately

// const mockedGetUserById = getUserById as jest.Mock;
// const mockedGetUserSubscriptionTier = getUserSubscriptionTier as jest.Mock;
// const mockedEvaluateAccess = evaluateAccess as jest.Mock;
// const mockedCheckFeatureLimit = checkFeatureLimit as jest.Mock;
// const mockedLogUserAction = logUserAction as jest.Mock;
// const mockedGetSubscriptionByUserId = getSubscriptionById as jest.Mock;
// const mockedUpdateSubscriptionCredits = updateSubscriptionCredits as jest.Mock;

// // Mock handleCreditThresholdNotifications
// jest.mock('../lib/credits', () => ({
//   ...jest.requireActual('../lib/credits'),
//   handleCreditThresholdNotifications: jest.fn().mockResolvedValue(undefined),
// }));

// // Utility to find a user by ID
// const findUserById = (userId: string) => mockUsers.find((user) => user.id === userId);

// // Reset mocks before each test to ensure isolation
// beforeEach(() => {
//   jest.resetAllMocks();
// });

// // Test Case 1: Athlete Admin User Accessing Own Organization's Resource
// test('Athlete Admin User Accessing Own Organization\'s Resource', async () => {
//   const userId = 'user_athlete_admin';
//   const resourceId = 'resource_1';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   expect(creditsDeducted).toBe(1); // Expected deduction based on baseCreditCosts and multipliers
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - 1
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: 1,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 1 Passed: Athlete Admin Access Granted and Credits Deducted.');
// });

// // Test Case 2: Agent User Accessing Own Organization's Resource
// test('Agent User Accessing Own Organization\'s Resource', async () => {
//   const userId = 'user_agent';
//   const resourceId = 'resource_2';
//   const action = 'write';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   const expectedDeduction = 3; // baseCost: write:Goal = 4, multiplier PRO = 0.8, rounded = 3
//   expect(creditsDeducted).toBe(expectedDeduction);
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - expectedDeduction
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: expectedDeduction,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 2 Passed: Agent User Access Granted and Credits Deducted.');
// });

// // Test Case 3: Member User Reading Public Resource
// test('Member User Reading Public Resource', async () => {
//   const userId = 'user_member';
//   const resourceId = 'resource_3';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   expect(creditsDeducted).toBe(1); // baseCost: read:Goal = 1, multiplier FREE = 1
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - 1
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: 1,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 3 Passed: Member User Access Granted and Credits Deducted.');
// });

// // Test Case 4: Member User Reading Private Resource
// test('Member User Reading Private Resource', async () => {
//   const userId = 'user_member_private';
//   const resourceId = 'resource_4';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(false); // Access denied
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 4 Passed: Member User Access Denied, No Credits Deducted.');
// });

// // Test Case 5: Member User Deleting a Resource
// test('Member User Deleting a Resource', async () => {
//   const userId = 'user_member_delete';
//   const resourceId = 'resource_5';
//   const action = 'delete';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(false); // Access denied
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 5 Passed: Member User Deletion Prohibited, No Credits Deducted.');
// });

// // Test Case 6: Manager User Accessing Resource
// test('Manager User Accessing Resource', async () => {
//   const userId = 'user_manager';
//   const resourceId = 'resource_6';
//   const action = 'write';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   const expectedDeduction = 3; // baseCost: write:Goal = 4, multiplier PRO = 0.8, rounded = 3
//   expect(creditsDeducted).toBe(expectedDeduction);
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - expectedDeduction
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: expectedDeduction,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 6 Passed: Manager User Access Granted and Credits Deducted.');
// });

// // Test Case 7: Admin User Accessing Another Organization's Resource
// test('Admin User Accessing Another Organization\'s Resource', async () => {
//   const userId = 'user_admin';
//   const resourceId = 'resource_7';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(false); // Access denied
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 7 Passed: Admin User Access Denied to Another Org\'s Resource, No Credits Deducted.');
// });

// // Test Case 8: User with No Applicable Policies
// test('User with No Applicable Policies', async () => {
//   const userId = 'user_no_policy';
//   const resourceId = 'resource_8';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(false); // No policies apply
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 8 Passed: User with No Applicable Policies Access Denied, No Credits Deducted.');
// });

// // Test Case 9: User with Multiple Groups Accessing Resource
// test('User with Multiple Groups Accessing Resource', async () => {
//   const userId = 'user_multi_group';
//   const resourceId = 'resource_9';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   expect(creditsDeducted).toBe(1); // baseCost: read:Goal = 1, multiplier PRO = 0.8, rounded = 1
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - 1
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: 1,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 9 Passed: User with Multiple Groups Access Granted and Credits Deducted.');
// });

// // Test Case 10: User Accessing Resource Without orgId
// test('User Accessing Resource Without orgId', async () => {
//   const userId = 'user_no_org';
//   const resourceId = 'resource_10';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(false); // Access denied
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 10 Passed: User Without orgId Access Denied, No Credits Deducted.');
// });

// // Test Case 11: Pro User Generates a Model - Credits Deducted with Multiplier
// test('Pro User Generates a Model - Credits Deducted with Multiplier', async () => {
//   const userId = 'user_pro';
//   const resourceId = 'resource_11';
//   const action = 'generate';
//   const resourceType = 'Model';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   const expectedDeduction = 8; // baseCost: generate:Model = 10, multiplier PRO = 0.8, rounded = 8
//   expect(creditsDeducted).toBe(expectedDeduction);
//   expect(updateSubscriptionCredits).toHaveBeenCalledWith(
//     user.subscription.subscriptionId,
//     user.subscription.credits - expectedDeduction
//   );

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: expectedDeduction,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 11 Passed: Pro User Generate Model Access Granted and Credits Deducted.');
// });

// // Test Case 12: Free User Exceeds Profile Views Limit
// test('Free User Exceeds Profile Views Limit', async () => {
//   const userId = 'user_free';
//   const feature = 'monthlyProfileViews';
//   const action = 'read';
//   const resourceType = 'Goal';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(false); // Limit reached
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);

//   // Execute feature limit check
//   const canProceed = await checkFeatureLimit({ userId, feature });

//   expect(canProceed).toBe(false);

//   // Ensure credits are not deducted
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled();
//   expect(mockedLogUserAction).not.toHaveBeenCalled();

//   console.log('Test Case 12 Passed: Free User Exceeded Profile Views Limit, Access Denied, No Credits Deducted.');
// });

// // Test Case 13: Enterprise User Accessing Unlimited Resources
// test('Enterprise User Accessing Unlimited Resources', async () => {
//   const userId = 'user_enterprise';
//   const resourceId = 'resource_12';
//   const action = 'create';
//   const resourceType = 'BusinessModelCard';

//   const user = findUserById(userId);
//   if (!user) throw new Error('User not found');

//   // Setup mocks
//   mockedGetUserById.mockResolvedValue(user);
//   mockedGetUserSubscriptionTier.mockResolvedValue(user.subscription.subscriptionTier);
//   mockedEvaluateAccess.mockResolvedValue(true);
//   mockedCheckFeatureLimit.mockResolvedValue(true);
//   mockedGetSubscriptionByUserId.mockResolvedValue(user.subscription);
//   mockedUpdateSubscriptionCredits.mockResolvedValue(undefined);
//   mockedLogUserAction.mockResolvedValue(undefined);

//   // Execute access evaluation
//   const accessGranted = await evaluateAccess({
//     userId,
//     action,
//     resourceId,
//     resourceType,
//     userAttributes: user,
//     subscription: user.subscription,
//   });

//   expect(accessGranted).toBe(true);

//   // Execute credits deduction
//   const creditsDeducted = await deductCredits({
//     userId,
//     action,
//     resourceType,
//     subscriptionId
//   });

//   expect(creditsDeducted).toBe(0); // No deduction for Enterprise
//   expect(updateSubscriptionCredits).not.toHaveBeenCalled(); // No update needed

//   // Verify that logUserAction was called correctly
//   expect(mockedLogUserAction).toHaveBeenCalledWith({
//     userId,
//     action,
//     resourceType,
//     creditsUsed: 0,
//     timestamp: expect.any(Date),
//   });

//   console.log('Test Case 13 Passed: Enterprise User Access Granted with Unlimited Credits.');
// });
