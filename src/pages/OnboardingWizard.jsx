import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Building2, Info, FileText, Loader } from 'lucide-react';
import { onboardSchoolGroup } from '../services/api';

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Organization Details
    groupName: '',
    displayName: '',
    organizationType: 'Private Limited',
    affiliatedBoards: ['CBSE'],
    establishedYear: new Date().getFullYear(),
    registrationNumber: '',
    domainName: '',
    subdomain: '',
    planType: 'Standard',
    paymentMode: 'Online',
    
    // Contact Details
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    altPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    country: 'India',
    timezone: 'Asia/Kolkata',
    preferredLanguage: 'English',
    
    // Compliance
    panNumber: '',
    gstNumber: '',
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    billingEmail: '',
    
    // Optional
    noOfSchools: '',
    remarks: '',
  });

  const steps = [
    { id: 1, title: 'Organization', icon: Building2 },
    { id: 2, title: 'Address & Contact', icon: Info },
    { id: 3, title: 'Compliance', icon: FileText },
    { id: 4, title: 'Review', icon: Check },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBoardChange = (board) => {
    const boards = formData.affiliatedBoards;
    if (boards.includes(board)) {
      handleChange('affiliatedBoards', boards.filter(b => b !== board));
    } else {
      handleChange('affiliatedBoards', [...boards, board]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Generate subdomain if not provided
      if (!formData.subdomain) {
        formData.subdomain = formData.groupName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
      }
      
      // Generate domain name
      if (!formData.domainName) {
        formData.domainName = `${formData.subdomain}.campusgrid.in`;
      }
      
      const response = await onboardSchoolGroup(formData);
      
      // Success! Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err.message || 'Failed to onboard school. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Onboard New School Group
          </h1>
          <p className="text-gray-600 text-lg">
            Complete all steps to add a new school network to CampusGrid
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 flex-wrap">
          {steps.map((s, index) => {
            const StepIcon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;

            return (
              <div key={s.id} className="flex items-center mb-2">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white shadow-lg' : isActive ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-110' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </div>
                  <p className={`mt-2 text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {s.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 hidden md:block ${isCompleted ? 'bg-green-500' : 'bg-gray-200'} transition-all duration-300`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="card p-8 md:p-10">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Organization Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Organization Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Group Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Podar Education Network"
                    value={formData.groupName}
                    onChange={(e) => handleChange('groupName', e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Podar Schools"
                    value={formData.displayName}
                    onChange={(e) => handleChange('displayName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Type *</label>
                  <select
                    className="input-field"
                    value={formData.organizationType}
                    onChange={(e) => handleChange('organizationType', e.target.value)}
                  >
                    <option>Private Limited</option>
                    <option>Trust</option>
                    <option>Society</option>
                    <option>Government</option>
                    <option>University</option>
                    <option>NGO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year *</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.establishedYear}
                    onChange={(e) => handleChange('establishedYear', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subdomain *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="podar"
                    value={formData.subdomain}
                    onChange={(e) => handleChange('subdomain', e.target.value.toLowerCase())}
                  />
                  <p className="text-xs text-gray-500 mt-1">Will create: {formData.subdomain || 'example'}.campusgrid.in</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Type *</label>
                  <select
                    className="input-field"
                    value={formData.planType}
                    onChange={(e) => handleChange('planType', e.target.value)}
                  >
                    <option>Free</option>
                    <option>Standard</option>
                    <option>Enterprise</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Affiliated Boards *</label>
                  <div className="flex flex-wrap gap-3">
                    {['CBSE', 'ICSE', 'State Board', 'IGCSE', 'IB'].map(board => (
                      <button
                        key={board}
                        type="button"
                        onClick={() => handleBoardChange(board)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          formData.affiliatedBoards.includes(board)
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {board}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="MH/EDU/2024/12345"
                    value={formData.registrationNumber}
                    onChange={(e) => handleChange('registrationNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact & Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Anil Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="9876543210"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="anil@school.org"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="9123456789"
                    value={formData.altPhone}
                    onChange={(e) => handleChange('altPhone', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1 *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="5th Floor, Link Road, Andheri West"
                    value={formData.addressLine1}
                    onChange={(e) => handleChange('addressLine1', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Opp. Citi Mall"
                    value={formData.addressLine2}
                    onChange={(e) => handleChange('addressLine2', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="400104"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Compliance & Finance */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Compliance & Finance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="AACCP1234K"
                    value={formData.panNumber}
                    onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="27AACCP1234K1Z5"
                    value={formData.gstNumber}
                    onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="HDFC Bank"
                    value={formData.bankName}
                    onChange={(e) => handleChange('bankName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="HDFC0001234"
                    value={formData.ifscCode}
                    onChange={(e) => handleChange('ifscCode', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Podar Education Network"
                    value={formData.accountHolderName}
                    onChange={(e) => handleChange('accountHolderName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="50200023456789"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange('accountNumber', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="accounts@podar.org"
                    value={formData.billingEmail}
                    onChange={(e) => handleChange('billingEmail', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Mode *</label>
                  <select
                    className="input-field"
                    value={formData.paymentMode}
                    onChange={(e) => handleChange('paymentMode', e.target.value)}
                  >
                    <option>Online</option>
                    <option>Invoice</option>
                    <option>UPI</option>
                    <option>NEFT</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Additional notes..."
                    value={formData.remarks}
                    onChange={(e) => handleChange('remarks', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Organization</h3>
                  <p className="text-gray-700"><strong>Name:</strong> {formData.groupName}</p>
                  <p className="text-gray-700"><strong>Display:</strong> {formData.displayName}</p>
                  <p className="text-gray-700"><strong>Type:</strong> {formData.organizationType}</p>
                  <p className="text-gray-700"><strong>Subdomain:</strong> {formData.subdomain || formData.groupName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20)}.campusgrid.in</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-700"><strong>Person:</strong> {formData.contactPerson}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {formData.contactEmail}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {formData.contactPhone}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700">{formData.addressLine1}</p>
                  <p className="text-gray-700">{formData.city}, {formData.state} - {formData.pincode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-8 border-t">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <div className="flex gap-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors flex items-center gap-2"
                  disabled={loading}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn-primary flex items-center gap-2"
                  disabled={loading}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Onboarding...
                    </>
                  ) : (
                    <>
                      Complete Onboarding
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;