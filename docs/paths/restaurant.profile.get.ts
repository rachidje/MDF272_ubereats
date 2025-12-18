/**
 * @swagger
 * /restaurant/profile:
 *   get:
 *     deprecated: true
 *     summary: Récupérer le profil du restaurant connecté
 *     tags:
 *       - Restaurants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations du restaurant récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantProfileResponse'
 *       401:
 *         description: Token manquant ou invalide
 */