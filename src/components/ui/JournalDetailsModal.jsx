// src/components/modals/JournalDetailsModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Eye,
  Tag,
  Edit,
  Trash2,
  User,
  Clock,
  Share2,
  Heart,
  BookOpen,
} from "lucide-react";
import Button from "../ui/Button";
import { format } from "date-fns";

const JournalDetailsModal = ({ isOpen, onClose, item, onEdit, onDelete }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleEditClick = () => {
    onClose();
    navigate(`/journal/edit/${item._id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header with Image */}
            <div className="relative">
              {/* Cover Image */}
              <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 bg-[#C58B48] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                    <Heart size={14} />
                    Featured
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-xs font-semibold text-[#C58B48] uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title */}
              <h2 className="font-cormorant text-3xl md:text-4xl text-[#1F2937] leading-[1.2] mb-3">
                {item.title}
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <User size={16} className="text-[#C58B48]" />
                  {item.author || "Violin Events"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#C58B48]" />
                  {item.date ? format(new Date(item.date), "MMM d, yyyy") : "-"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-[#C58B48]" />
                  {item.readTime || "5 min read"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={16} className="text-[#C58B48]" />
                  {item.views || 0} views
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Excerpt */}
              <div className="mb-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#EBE3D5]">
                <p className="text-gray-600 font-inter text-sm leading-relaxed italic">
                  "{item.excerpt}"
                </p>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-[#C58B48]" />
                  Full Story
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600 font-inter leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100">
                  {item.content}
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Tag size={18} className="text-[#C58B48]" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#C58B48] hover:text-white transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Images */}
              {item.images && item.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {item.images.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-[#C58B48] transition-colors cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=100&q=80";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#FDFBF7] rounded-xl border border-[#EBE3D5] mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C58B48]">
                    {item.views || 0}
                  </p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C58B48]">
                    {item.featured ? "⭐" : "—"}
                  </p>
                  <p className="text-xs text-gray-500">Featured</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C58B48]">
                    {item.isActive ? "✅" : "❌"}
                  </p>
                  <p className="text-xs text-gray-500">Status</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C58B48]">
                    {item.tags?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500">Tags</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleEditClick}
                >
                  <Edit size={16} />
                  Edit Item
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                  onClick={() => {
                    onClose();
                    onDelete(item._id, item.title);
                  }}
                >
                  <Trash2 size={16} />
                  Delete Item
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JournalDetailsModal;
