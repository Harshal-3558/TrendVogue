import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div class="text-center text-5xl space-y-6">
        <button>
          <i class="fa-solid fa-circle-up text-red-400 animate-bounce"></i>
        </button>
      </div>
      <footer class="border border-t-4">
        <div class="flex bg-gray-100 space-x-4 px-5 py-4">
          <ul class="space-y-2 w-full">
            <li class="hover:text-red-600">Your TrendVogue.com</li>
            <li class="hover:text-red-600">Wish List</li>
            <li class="hover:text-red-600">Your Account</li>
            <li class="hover:text-red-600">Returns</li>
            <li class="hover:text-red-600">Customer Service</li>
          </ul>
          <ul class="space-y-2 w-full">
            <li class="hover:text-red-600">Your Orders</li>
            <li class="hover:text-red-600">About Us</li>
            <li class="hover:text-red-600">Blog</li>
            <li class="hover:text-red-600">Contact Us</li>
          </ul>
        </div>
        <div>
          <div class="bg-red-500 text-white text-center py-2 space-y-4">
            <p>Connect With Us</p>
            <div class="flex justify-center space-x-8 text-3xl">
              <FaInstagram />
              <FaTwitter />
              <FaFacebook />
              <FaPinterest />
              <FaYoutube />
            </div>
            <div class="flex space-x-3 items-center justify-center">
              <i class="fa-regular fa-copyright"></i>
              <p>www.TrendVogue.com</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
