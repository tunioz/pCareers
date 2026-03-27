import { motion } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';

interface FilterControlsProps {
  department: string;
  product: string;
  seniority: string;
  viewMode: 'product' | 'department';
  resultsCount: number;
  onDepartmentChange: (value: string) => void;
  onProductChange: (value: string) => void;
  onSeniorityChange: (value: string) => void;
  onViewModeToggle: () => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function FilterControls({
  department,
  product,
  seniority,
  viewMode,
  resultsCount,
  onDepartmentChange,
  onProductChange,
  onSeniorityChange,
  onViewModeToggle,
  onClearAll,
  hasActiveFilters,
}: FilterControlsProps) {
  return (
    <section className="py-6 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Department */}
            <div className="relative">
              <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="appearance-none bg-[#f4f4f4] text-[#4b5563] px-5 py-2.5 pr-10 rounded-full text-sm font-medium cursor-pointer hover:bg-[#e5e5e5] transition-colors"
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Security">Security</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Design">Design</option>
                <option value="Mobile">Mobile</option>
                <option value="Quality">Quality</option>
                <option value="Business">Business</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b5563] pointer-events-none" size={16} />
            </div>

            {/* Product */}
            <div className="relative">
              <select
                value={product}
                onChange={(e) => onProductChange(e.target.value)}
                className="appearance-none bg-[#f4f4f4] text-[#4b5563] px-5 py-2.5 pr-10 rounded-full text-sm font-medium cursor-pointer hover:bg-[#e5e5e5] transition-colors"
              >
                <option value="All">All Products</option>
                <option value="pCloud Drive">pCloud Drive</option>
                <option value="pCloud Encryption">pCloud Encryption</option>
                <option value="pCloud Pass">pCloud Pass</option>
                <option value="pCloud Business">pCloud Business</option>
                <option value="Platform/Core">Platform/Core</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b5563] pointer-events-none" size={16} />
            </div>

            {/* Seniority */}
            <div className="relative">
              <select
                value={seniority}
                onChange={(e) => onSeniorityChange(e.target.value)}
                className="appearance-none bg-[#f4f4f4] text-[#4b5563] px-5 py-2.5 pr-10 rounded-full text-sm font-medium cursor-pointer hover:bg-[#e5e5e5] transition-colors"
              >
                <option value="All">All Levels</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Staff">Staff</option>
                <option value="Principal">Principal</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b5563] pointer-events-none" size={16} />
            </div>

            {/* Clear All */}
            <motion.button
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                hasActiveFilters
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={onClearAll}
              disabled={!hasActiveFilters}
              whileHover={hasActiveFilters ? { scale: 1.05 } : {}}
              whileTap={hasActiveFilters ? { scale: 0.95 } : {}}
            >
              <X size={16} />
              Clear All
            </motion.button>
          </div>

          {/* View Toggle & Results */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#4b5563] font-medium">
              {resultsCount} {resultsCount === 1 ? 'role' : 'roles'} found
            </span>
            <motion.button
              className="bg-[#0055d5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0044aa] transition-colors"
              onClick={onViewModeToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {viewMode === 'product' ? 'Department View' : 'Product View'}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
