import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">MeritCap</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted partner for educational journey. We provide comprehensive guidance for study abroad,
              education loans, and career development.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Study Abroad */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Study Abroad</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <Link href="/study/abroad/usa" className="text-gray-400 hover:text-white transition-colors">
                USA
              </Link>
              <Link href="/study/abroad/uk" className="text-gray-400 hover:text-white transition-colors">
                UK
              </Link>
              <Link href="/study/abroad/canada" className="text-gray-400 hover:text-white transition-colors">
                Canada
              </Link>
              <Link href="/study/abroad/australia" className="text-gray-400 hover:text-white transition-colors">
                Australia
              </Link>
              <Link href="/study/abroad/germany" className="text-gray-400 hover:text-white transition-colors">
                Germany
              </Link>
              <Link href="/study/abroad/france" className="text-gray-400 hover:text-white transition-colors">
                France
              </Link>
              <Link href="/study/abroad/singapore" className="text-gray-400 hover:text-white transition-colors">
                Singapore
              </Link>
              <Link href="/study/abroad/newzealand" className="text-gray-400 hover:text-white transition-colors">
                New Zealand
              </Link>
            </div>

            <h4 className="text-md font-medium mt-6 mb-3">Study India</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <Link href="/study/india/hyderabad" className="text-gray-400 hover:text-white transition-colors">
                Hyderabad
              </Link>
              <Link href="/study/india/bangalore" className="text-gray-400 hover:text-white transition-colors">
                Bangalore
              </Link>
              <Link href="/study/india/chennai" className="text-gray-400 hover:text-white transition-colors">
                Chennai
              </Link>
              <Link href="/study/india/mumbai" className="text-gray-400 hover:text-white transition-colors">
                Mumbai
              </Link>
              <Link href="/study/india/delhi" className="text-gray-400 hover:text-white transition-colors">
                Delhi
              </Link>
              <Link href="/study/india/pune" className="text-gray-400 hover:text-white transition-colors">
                Pune
              </Link>
            </div>
          </div>

          {/* Services & Test Prep */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-1 text-sm">
              <Link href="/services/counseling" className="block text-gray-400 hover:text-white transition-colors">
                Counseling Services
              </Link>
              <Link href="/services/education-loans" className="block text-gray-400 hover:text-white transition-colors">
                Education Loans
              </Link>
              <Link href="/services/visa-assistance" className="block text-gray-400 hover:text-white transition-colors">
                Visa Assistance
              </Link>
              <Link href="/services/career-guidance" className="block text-gray-400 hover:text-white transition-colors">
                Career Guidance
              </Link>
              <Link href="/community" className="block text-gray-400 hover:text-white transition-colors">
                Student Community
              </Link>
            </div>

            <h4 className="text-md font-medium mt-6 mb-3">Test Preparation</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <Link href="/test-prep/ielts" className="text-gray-400 hover:text-white transition-colors">
                IELTS
              </Link>
              <Link href="/test-prep/toefl" className="text-gray-400 hover:text-white transition-colors">
                TOEFL
              </Link>
              <Link href="/test-prep/gre" className="text-gray-400 hover:text-white transition-colors">
                GRE
              </Link>
              <Link href="/test-prep/gmat" className="text-gray-400 hover:text-white transition-colors">
                GMAT
              </Link>
              <Link href="/test-prep/sat" className="text-gray-400 hover:text-white transition-colors">
                SAT
              </Link>
              <Link href="/test-prep/cat" className="text-gray-400 hover:text-white transition-colors">
                CAT
              </Link>
            </div>
          </div>

          {/* Company & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-1 text-sm">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/success-stories" className="block text-gray-400 hover:text-white transition-colors">
                Success Stories
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/events" className="block text-gray-400 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h4 className="text-md font-medium mb-4 text-center">Top Courses</h4>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href="/courses/mba" className="text-gray-400 hover:text-white transition-colors">
              MBA
            </Link>
            <Link href="/courses/ms" className="text-gray-400 hover:text-white transition-colors">
              MS in Computer Science
            </Link>
            <Link href="/courses/engineering" className="text-gray-400 hover:text-white transition-colors">
              Engineering
            </Link>
            <Link href="/courses/medicine" className="text-gray-400 hover:text-white transition-colors">
              Medicine
            </Link>
            <Link href="/courses/business" className="text-gray-400 hover:text-white transition-colors">
              Business Analytics
            </Link>
            <Link href="/courses/data-science" className="text-gray-400 hover:text-white transition-colors">
              Data Science
            </Link>
            <Link href="/courses/finance" className="text-gray-400 hover:text-white transition-colors">
              Finance
            </Link>
            <Link href="/courses/law" className="text-gray-400 hover:text-white transition-colors">
              Law
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-400">+91 9849943319</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-400">support@meritcap.com</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Head Office</p>
                <p className="text-sm text-gray-400">Punjagutta, Hyderabad</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Branches</p>
                <p className="text-sm text-gray-400">Warangal, Vijayawada, Vizag</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">© 2024 MeritCap. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
