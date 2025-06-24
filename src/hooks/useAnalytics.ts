import { useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import { GameState } from '../types/game';

export const useAnalytics = (gameState: GameState) => {
  const { user } = useAuth();

  const updateAnalytics = useCallback(async () => {
    if (!user || !gameState) return;

    try {
      const analyticsData = {
        user_id: user.id,
        coins: gameState.coins,
        gems: gameState.gems,
        health: gameState.playerStats.hp,
        max_health: gameState.playerStats.maxHp,
        zone: gameState.zone,
        attack: gameState.playerStats.atk,
        defense: gameState.playerStats.def,
      };

      // Try to update existing record first
      const { data: existingData, error: selectError } = await supabase
        .from('user_analytics')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('user_analytics')
          .update(analyticsData)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating analytics:', error);
        }
      } else {
        // Insert new record
        const { error } = await supabase
          .from('user_analytics')
          .insert(analyticsData);

        if (error) {
          console.error('Error inserting analytics:', error);
        }
      }
    } catch (error) {
      console.error('Error in updateAnalytics:', error);
    }
  }, [user, gameState]);

  // Update analytics every 30 seconds and on significant changes
  useEffect(() => {
    if (!user) return;

    // Initial update
    updateAnalytics();

    // Set up interval for periodic updates
    const interval = setInterval(updateAnalytics, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [updateAnalytics, user]);

  // Update analytics on significant game state changes
  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(updateAnalytics, 1000); // Debounce updates
    return () => clearTimeout(timeout);
  }, [
    gameState.coins,
    gameState.gems,
    gameState.zone,
    gameState.playerStats.hp,
    gameState.playerStats.atk,
    gameState.playerStats.def,
    updateAnalytics,
    user
  ]);

  return { updateAnalytics };
};