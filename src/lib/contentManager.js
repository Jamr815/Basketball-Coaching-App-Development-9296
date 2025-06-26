import supabase from './supabase.js';

class ContentManager {
  constructor() {
    this.isSupabaseConnected = false;
    this.checkSupabaseConnection();
  }

  checkSupabaseConnection() {
    // Check if Supabase is properly configured
    try {
      this.isSupabaseConnected = 
        typeof supabase.from === 'function' && 
        localStorage.getItem('supabaseConnected') === 'true';
    } catch (error) {
      console.warn('Supabase connection check failed:', error);
      this.isSupabaseConnected = false;
    }
  }

  async loadContent() {
    if (this.isSupabaseConnected) {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('site_id', 'beard-basketball')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading content:', error);
          return this.loadFromLocalStorage();
        }

        return data?.content || this.getDefaultContent();
      } catch (error) {
        console.error('Supabase error:', error);
        return this.loadFromLocalStorage();
      }
    }

    return this.loadFromLocalStorage();
  }

  async saveContent(content) {
    if (this.isSupabaseConnected) {
      try {
        const { error } = await supabase
          .from('site_content')
          .upsert({
            site_id: 'beard-basketball',
            content: content,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving to Supabase:', error);
          this.saveToLocalStorage(content);
          return false;
        }

        // Also save to localStorage as backup
        this.saveToLocalStorage(content);
        return true;
      } catch (error) {
        console.error('Supabase error:', error);
        this.saveToLocalStorage(content);
        return false;
      }
    }

    this.saveToLocalStorage(content);
    return true;
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('siteContent');
      return saved ? JSON.parse(saved) : this.getDefaultContent();
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return this.getDefaultContent();
    }
  }

  saveToLocalStorage(content) {
    try {
      localStorage.setItem('siteContent', JSON.stringify(content));
      localStorage.setItem('lastContentUpdate', new Date().toISOString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getDefaultContent() {
    return {
      hero: {
        title: 'Unlock Your Basketball Potential',
        subtitle: 'Train with Julian Beard, former professional player with international experience. Master 20 specialized skill modules designed to elevate your game.',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: [
          { number: '500+', label: 'Players Trained' },
          { number: '20', label: 'Skill Modules' },
          { number: '5+', label: 'Years Experience' }
        ],
        cta: {
          title: 'Start Training Today',
          subtitle: 'From $25/session'
        }
      },
      features: {
        title: 'Why Choose B.E.A.R.D. Training?',
        subtitle: 'Experience professional-level basketball training with personalized attention and proven methodologies',
        items: [
          {
            title: 'Personalized Training',
            description: 'Customized skill development programs tailored to your specific needs and goals.'
          },
          {
            title: 'Expert Mentorship',
            description: 'Learn from Julian Beard, former professional player with international experience.'
          },
          {
            title: 'Progress Tracking',
            description: 'Monitor your improvement with detailed analytics and performance metrics.'
          },
          {
            title: '20 Skill Modules',
            description: 'Comprehensive training covering all aspects of basketball from fundamentals to advanced techniques.'
          },
          {
            title: 'Video Analysis',
            description: 'Film breakdown and game study to enhance your basketball IQ and decision-making.'
          },
          {
            title: 'Flexible Scheduling',
            description: 'Book sessions that fit your schedule with our integrated booking system.'
          }
        ]
      }
    };
  }

  async updateContent(keyPath, value) {
    try {
      const content = await this.loadContent();
      const keys = keyPath.split('.');
      let current = content;

      // Navigate to the parent object
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      // Set the value
      current[keys[keys.length - 1]] = value;

      // Save the updated content
      await this.saveContent(content);
      return content;
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  }

  async getContentValue(keyPath) {
    try {
      const content = await this.loadContent();
      const keys = keyPath.split('.');
      let current = content;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return null;
        }
      }

      return current;
    } catch (error) {
      console.error('Error getting content value:', error);
      return null;
    }
  }
}

export default new ContentManager();