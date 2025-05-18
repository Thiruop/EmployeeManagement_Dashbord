import { FC } from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`${sizeClasses[size]} overflow-hidden rounded-full ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://via.placeholder.com/150?text=User';
        }}
      />
    </div>
  );
};

export default UserAvatar;