import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
    console.log('[STATUS] Checking authentication status.');
  
    const token = req.cookies?.authToken;
    console.log('[STATUS] Token received from cookies:', token);
  
    if (!token) {
      console.log('[STATUS] No token provided. User not authenticated.');
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    console.log('[STATUS] User authenticated successfully.');
    res.status(200).json({ message: 'Authenticated' });
  });
  

export default router;
