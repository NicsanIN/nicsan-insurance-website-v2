import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseService {
  // Insurance Products
  async getProducts() {
    const { data, error } = await supabase
      .from('insurance_products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async getProduct(slug) {
    const { data, error } = await supabase
      .from('insurance_products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  async createProduct(productData) {
    const { data, error } = await supabase
      .from('insurance_products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(id, productData) {
    const { data, error } = await supabase
      .from('insurance_products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProduct(id) {
    const { error } = await supabase
      .from('insurance_products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }

  // Safety Call Requests
  async getSafetyCalls(params = {}) {
    let query = supabase
      .from('safety_call_requests')
      .select('*, insurance_products(name, slug)')
      .order('created_at', { ascending: false });

    if (params.status) {
      query = query.eq('status', params.status);
    }
    if (params.product_id) {
      query = query.eq('product_id', params.product_id);
    }
    if (params.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getSafetyCall(id) {
    const { data, error } = await supabase
      .from('safety_call_requests')
      .select('*, insurance_products(name, slug)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createSafetyCall(safetyCallData) {
    console.log('Creating safety call with data:', safetyCallData);
    
    const { data, error } = await supabase
      .from('safety_call_requests')
      .insert([safetyCallData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Safety call created successfully:', data);
    return data;
  }

  async updateSafetyCallStatus(id, statusData) {
    const { data, error } = await supabase
      .from('safety_call_requests')
      .update(statusData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSafetyCallStats() {
    const { data, error } = await supabase
      .from('safety_call_requests')
      .select('status, created_at');

    if (error) throw error;

    const stats = {
      total: data.length,
      pending: data.filter(call => call.status === 'pending').length,
      scheduled: data.filter(call => call.status === 'scheduled').length,
      completed: data.filter(call => call.status === 'completed').length,
      cancelled: data.filter(call => call.status === 'cancelled').length,
      recent: data.filter(call => {
        const callDate = new Date(call.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return callDate >= weekAgo;
      }).length
    };

    return stats;
  }

  // Company Information
  async getCompanyInfo() {
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async updateCompanyInfo(companyData) {
    const { data, error } = await supabase
      .from('company_info')
      .upsert([companyData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Core Values
  async getCoreValues() {
    const { data, error } = await supabase
      .from('core_values')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  }

  async createCoreValue(coreValueData) {
    const { data, error } = await supabase
      .from('core_values')
      .insert([coreValueData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateCoreValue(id, coreValueData) {
    const { data, error } = await supabase
      .from('core_values')
      .update(coreValueData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Founders
  async getFounders() {
    const { data, error } = await supabase
      .from('founders')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  }

  async createFounder(founderData) {
    const { data, error } = await supabase
      .from('founders')
      .insert([founderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFounder(id, founderData) {
    const { data, error } = await supabase
      .from('founders')
      .update(founderData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Contact Information
  async getContactInfo() {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async createContactInfo(contactData) {
    const { data, error } = await supabase
      .from('contact_info')
      .insert([contactData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateContactInfo(id, contactData) {
    const { data, error } = await supabase
      .from('contact_info')
      .update(contactData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Content Sections
  async getContentSection(section) {
    const { data, error } = await supabase
      .from('content_sections')
      .select('*')
      .eq('section_name', section)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  async updateContentSection(section, contentData) {
    const { data, error } = await supabase
      .from('content_sections')
      .upsert([{ section_name: section, ...contentData }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Health Check
  async healthCheck() {
    try {
      const { error } = await supabase
        .from('company_info')
        .select('id')
        .limit(1);

      if (error) throw error;
      return { status: 'healthy', timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}

const apiService = new SupabaseService();
export default apiService; 